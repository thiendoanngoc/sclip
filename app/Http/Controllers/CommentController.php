<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;
use App\User;

class CommentController extends Controller
{
    public function index(Request $request) {
        $sclip_id = $request['sclip_id'];

        if($sclip_id) {
            try {
                $data = Comment::where('sclip_id', $sclip_id)->with('user')->orderBy('id', 'desc')->get();
                return response()->json(['success' => $data]);
            }
            catch(\Exception $e) {
                return response()->json(['error' => 'Có lỗi xảy ra, vui lòng thử lại']);
            }
        }
        else {
            return response()->json(['error' => 'Clip không tồn tại']);
        }
    }

    public function postComment(Request $request) {
        $sclip_id = $request['sclip_id'];
        $user_id = $request['user_id'];
        $comment = $request['comment'];

        if($sclip_id && $user_id && $comment) {
            $create = Comment::create([
                'sclip_id' => $sclip_id,
                'user_id' => $user_id,
                'body' => $comment,
            ]);

            if($create) {
                return response()->json(['success' => 'Bình luận thành công']);
            }
            else {
                return response()->json(['error' => 'Bình luận thất bại']);
            }
        }
        else {
            return response()->json(['error' => 'Nội dung bình luận chưa có']);
        }
    }
}
