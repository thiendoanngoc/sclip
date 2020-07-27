<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\SClip;
use App\User;
use App\Log;
use Storage;

class SClipController extends Controller
{
    public function index()
    {
        $sclips = SClip::orderBy('sclip_id', 'desc')->get();

        return $sclips->toJson();
    }

    public function show($sclip_id)
    {
        if($sclip_id) {
            try {
                $sclip_data = SClip::where('sclip_id', $sclip_id)->with('user')->first();
                return response()->json(['success' => $sclip_data]);
            }
            catch(\Exception $e) {
                return response()->json(['error' => 'Có lỗi trong quá trình xử lý...']);
            }
        }
    }

    // Upload clip
    public function upload(Request $request)
    {
        $title = $request['title'];
        $content = $request['content'];

        if($title == '') {
            return response()->json([
                'status' => 'error',
                'msg' => [
                    'title' => 'Tiêu đề không được để trống',
                    'content' => ''
                ]
            ]);
        }
        else if($content == '') {
            return response()->json([
                'status' => 'error',
                'msg' => [
                    'title' => '',
                    'content' => 'Nội dung không được để trống'
                ]
            ]);
        }
        else {
            $username = $request['username'];
            $user_id = $request['user_id'];
            
            // Thumbnail
            $thumbnail = $request->file('thumbnail');
            $ext_thumbnail = $thumbnail->extension();
            $name_thumbnail = str_random(20).'.'.$ext_thumbnail;

            // SCLIP
            $sclip = $request->file('sclip');
            $ext_sclip = $sclip->extension();
            $name_sclip = str_random(20).'.'.$ext_sclip;

            // list($width, $height) = getimagesize($file);
            
            try {
                $path_sclip = Storage::disk('public')->putFileAs(
                    $username, $sclip, $name_sclip
                );

                $path_thumbnail = Storage::disk('public')->putFileAs(
                    $username, $thumbnail, $name_thumbnail
                );

                if($path_sclip && $path_thumbnail) {
                    $sclip_id = str_random(10);
                    
                    $create = Sclip::create([
                        'sclip_id' => $sclip_id,
                        'user_id' => $user_id,
                        'title' => $title,
                        'content' => $content,
                        'link' => '/storage/'.$path_sclip,
                        'thumbnail' => '/storage/'.$path_thumbnail,
                        'view' => 0,
                        'love' => 0,
                    ]);

                    $log = Log::create([
                        'user_id' => $user_id,
                        'sclip_id' => $sclip_id,
                        'note' => ''
                    ]);

                    if($create && $log) {
                        return response()->json([
                            'success' => $name
                        ]);
                    }
                }
            }
            catch(\Exception $e) {
                return response()->json(['success' => $e]);
            }
        }
    }

    public function sclipCount(Request $request)
    {
        $sclip_id = $request['sclip_id'];

        if($sclip_id) {
            try {
                $count = SClip::where('sclip_id', '=', $sclip_id)->first();
                return response()->json([
                    'status' => 'success',
                    'view' => $count->view,
                    'love' => $count->love,
                ]);
            }
            catch(\Exception $e) {
                return response()->json([
                    'status' => 'error',
                    'msg' => $e
                ]);
            }
        }
    }
}
