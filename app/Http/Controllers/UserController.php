<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Comment;
use App\SClip;

class UserController extends Controller
{
    public function viewProfile(Request $request)
    {
        $username = $request['username'];

        if($username) {
            try {
                $data_user = User::where('username', '=', $username)->first();
                return response()->json(['success' => $data_user]);
            }
            catch(\Exception $e) {
                return response()->json(['success' => $e]);
            }
        }
    }

    public function listSclip(Request $request)
    {
        $user_id = $request['user_id'];

        if($user_id) {
            try {
                $data_sclip = SClip::where('user_id', '=', $user_id)->get();
                return response()->json(['success' => $data_sclip]);
            }
            catch(\Exception $e) {
                return response()->json(['success' => $e]);
            }
        }
    }

    public function changePassword(Request $request)
    {
        $old_password = $request['old_password'];
        $new_password = $request['new_password'];
        $re_new_password = $request['re_new_password'];

        if($old_password == '' || $old_password == null) {
            return response()->json([
                'status' => 'error',
                'msg' => [
                    'old_password' => 'Mật khẩu cũ không được để trống',
                ]
            ]);
        }
        else if($new_password == '' || $new_password == null) {
            return response()->json([
                'status' => 'error',
                'msg' => [
                    'new_password' => 'Mật khẩu mới không được để trống',
                ]
            ]);
        }
        else if($re_new_password == '' || $re_new_password == null) {
            return response()->json([
                'status' => 'error',
                'msg' => [
                    're_new_password' => 'Xác nhận mật khẩu không được để trống',
                ]
            ]);
        }
        else if(strlen($new_password) < 8) {
            return response()->json([
                'status' => 'error',
                'msg' => [
                    'new_password' => 'Mật khẩu mới không được bé hơn 8 ký tự',
                ]
            ]);
        }
        else if($new_password !== $re_new_password) {
            return response()->json([
                'status' => 'error',
                'msg' => [
                    're_new_password' => 'Mật khẩu không khớp, vui lòng kiểm tra lại',
                ]
            ]);
        }
        else {
            $user_id = $request['user_id'];
            $check_password = User::where('id', '=', $user_id)->first();

            if(\Hash::check($old_password, $check_password->password)) {
                $new_password = \str_replace(' ', '', $new_password);
                $new_password = \Hash::make($new_password);
                try {
                    $update_password = User::find($user_id)->update(['password' => $new_password]);
                    if($update_password) {
                        return response()->json([
                            'status' => 'success',
                            'msg' => 'Đổi mật khẩu thành công',
                        ]);
                    }
                    else {
                        return response()->json([
                            'status' => 'error',
                            'msg' => 'Có lỗi, vui lòng thử lại',
                        ]);
                    }
                }
                catch(\Exception $e) {
                    return response()->json([
                        'status' => 'error',
                        'msg' => 'Có lỗi, vui lòng thử lại',
                    ]);
                }
            }
            else {
                return response()->json([
                    'status' => 'error',
                    'msg' => [
                        'old_password' => 'Mật khẩu cũ không chính xác',
                    ]
                ]);
            }
        }
    }

    public function changeAvatar(Request $request)
    {
        $user_id = $request['user_id'];
        $username = $request['username'];

        $avatar = $request->file('avatar');
        $ext_avatar = $avatar->extension();
        $name_avatar = str_random(20).'.'.$ext_avatar;

        try {
            $path_avatar = \Storage::disk('public')->putFileAs(
                $username, $avatar, $name_avatar
            );

            if($path_avatar) {
                $update = User::find($user_id)->update(['avatar' => '/storage/'.$path_avatar]);

                if($update) {
                    return response()->json([
                        'status' => 'success',
                        'msg' => 'Avatar đã được tải lên'
                    ]);
                }
                else {
                    return response()->json([
                        'status' => 'error',
                        'msg' => 'Có lỗi, vui lòng thử lại'
                    ]);
                }
            }
            else {
                return response()->json([
                    'status' => 'error',
                    'msg' => 'Có lỗi, vui lòng thử lại'
                ]);
            }
        }
        catch(\Exception $e) {
            return response()->json([
                'status' => 'error',
                'msg' => 'Có lỗi, vui lòng thử lại'
            ]);
        }
    }
}
