<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;
use Validator, DB, Hash, Mail, JWTAuth;

class ApiController extends Controller
{
    public function login(Request $request)
    {
        $input = [
            'username' => $request['username'],
            'password' => $request['password']
        ];

        $rules = [
            'username' => 'required|exists:users|max:255|regex:/^\S*$/u',
            'password' => 'required|min:8'
        ];

        $messages = [
            'username.required' => 'Tên đăng nhập không được để trống',
            'username.exists' => 'Tên đăng nhập không tồn tại',
            'username.max' => 'Tên đăng nhập không được dài hơn 255 ký tự',
            'username.regex' => 'Tên đăng nhập không được có khoảng trắng',
            'password.required' => 'Mật khẩu không được để trống',
            'password.min' => 'Mật khẩu không đuợc nhỏ hơn 8 ký tự'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if($validator->fails()) {
            return response()->json([
                    'status' => 'error',
                    'message' => $validator->errors()
                ]);
        }
        $credentials = $request->only('username', 'password');
        $username = $credentials['username'];
        try {
            if(!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'status' => 'wrongpass',
                    'message' => 'Mật khẩu không đúng'
                ]);
            }
        }
        catch (JWTException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đăng nhập thất bại, vui lòng thử lại'
            ]);
        }

        return response()->json([
                'status' => 'success',
                'token' => $token,
                'user' => User::where('username', $username)->first()
            ]);
    }

    public function register(Request $request)
    {
        $rules = [
            'username' => 'required|unique:users|max:255|regex:/^\S*$/u',
            'email' => 'required|unique:users|email|max:255',
            'password' => 'required|min:8',
            're_password' => 'required|same:password',
            'fullname' => 'required'
        ];

        $messages = [
            'username.required' => 'Tên đăng nhập không được để trống',
            'username.unique' => 'Tên đăng nhập đã tồn tại',
            'username.max' => 'Tên đăng nhập không được dài hơn 255 ký tự',
            'username.regex' => 'Tên đăng nhập không được có khoảng trắng',
            'username.alpha_dash' => 'Tên đăng nhập không được để dấu',
            'email.required' => 'Email không được để trống',
            'email.unique' => 'Email đã tồn tại',
            'email.email' => 'Email không đúng định dạng',
            'email.max' => 'Email không được dài hơn 255 ký tự',
            'password.required' => 'Mật khẩu không được để trống',
            'password.min' => 'Mật khẩu không đuợc nhỏ hơn 8 ký tự',
            're_password.required' => 'Xác nhận mật khẩu không được để trống',
            're_password.same' => 'Xác nhận mật khẩu không khớp',
            'fullname.required' => 'Tên đầy đủ không được để trống'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if($validator->fails()) {
            return response()->json(['errors' => $validator->errors()]);
        }
        else {
            $user = User::create([
                'username' => trim(strtolower($request['username'])),
                'email' => $request['email'],
                'password' => Hash::make($request['password']),
                'fullname' => $request['fullname'],
                'avatar' => '/images/user.svg'
            ]);

            return response()->json(['success' => 'Đăng ký thành công']);
        }
    }

    public function user(Request $request)
    {
        $user = JWTAuth::user();
        return response()->json(['result' => $user]);
    }

    public function logout(Request $request) {
        $this->validate($request, ['token' => 'required']);
        
        try {
            JWTAuth::invalidate($request->input('token'));
            return response()->json(['success' => 'Đăng xuất thành công'], 200);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Đăng xuất thất bại, vui lòng thử lại'], 400);
        }
    }

    public function refresh()
    {
        try {
            $newToken = auth()->refresh();
        }
        catch(\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['error' => $e->getMessage()], 401);
        }

        return response()->json(['token' => $newToken]);
    }

    public function setToken(Request $request) {
        $token = $request['token'];
        $id = $request['id'];
        
        try {
            $update = User::find($id)->update(['remember_token' => $token]);
            if($update) {
                return response()->json([
                    'status' => 'success',
                ]);
            }
            else {
                return response()->json([
                    'status' => 'error'
                ]);
            }
        }
        catch(\Exception $e) {
            return response()->json([
                'status' => 'error'
            ]);
        }
    }

    public function checkToken(Request $request) {
        $token = $request['token'];
        $id = $request['id'];
        
        try {
            User::where([
                ['id', '=', $id],
                ['remember_token', '=', $token]
            ]);
            return response()->json(['status' => 'success'], 200);
        }
        catch(Exception $e) {
            return response()->json(['status' => 'error'], 400);
        }
    }

    protected function respondWithToken($token) 
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in'   => JWTAuth::factory()->getTTL() * 60
        ]);
    }
}
