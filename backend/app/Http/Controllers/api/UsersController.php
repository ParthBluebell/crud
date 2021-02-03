<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Userlist;
use Validator;

class UsersController extends Controller
{
    //

    function __construct()
    {

    }

    public function one_validation_message($validator){
        $validation_messages = $validator->getMessageBag()->toArray();
        $validation_messages1 = array_values($validation_messages);

           $new_validation_messages = [];
           for ($i = 0; $i < count($validation_messages1); $i++) {
               $inside_element = count($validation_messages1[$i]);
                for ($j=0; $j < $inside_element; $j++) {
                   array_push($new_validation_messages,$validation_messages1[$i]);
                }
           }
      return implode(' ',$new_validation_messages[0]);
   }

    public function userslist(Request $request){
        $objUserlist = new Userlist();
        $userslist = $objUserlist->getUserList($request);

        if(!empty($userslist[0])){
            return response()->json(["message"=> "Userlist found sucessfully" , 'userDetails' => $userslist], 200);
        }else{
            return response()->json(["message"=> "Userlist not avilable" , 'userDetails' => $userslist ], 201);
        }
    }

    public function baseurl(Request $request){
        return response()->json(["message"=> "Base url found succesfully" , 'baseurl' => asset('/')], 200);
    }


    public function addUser(Request $request){
        $objUserlist = new Userlist();
        $res = $objUserlist->addUser($request);

        if($res == "emailExits"){
            return response()->json([
                "message"=> "This email already exists.",
                "status" => "warning"
            ], 200);
        }else{
            if($res == "true"){
                return response()->json([
                    "message"=> "User details sucessfully added",
                    "status" => "success"
                ], 200);
            }else{
                return response()->json([
                    "message"=> "Something goes to wrong.Please try again later.",
                    "status" => "fail"
                ], 200);
            }
        }
    }


    public function editUser(Request $request){

        $objUserlist = new Userlist();
        $res = $objUserlist->editUser($request);

        if($res == "emailExits"){
            return response()->json([
                "message"=> "This email already exists",
                "status" => "warning"
            ], 200);
        }else{
            if($res == "true"){
                return response()->json([
                    "message"=> "User details sucessfully edited",
                    "status" => "success"
                ], 200);
            }else{
                return response()->json([
                    "message"=> "Something goes to wrong.Please try again later.",
                    "status" => "fail"
                ], 200);
            }
        }
    }

    public function userDetails(Request $request){
            $userId = $request->input();

            $objUserlist = new Userlist();
            $res = $objUserlist->getuserDetails($userId[0]);
            if($res){
                return response()->json(["message"=> "User details sucessfully found" , 'details' => $res ], 200);
            }else{
                return response()->json(["message"=> "Something goess to wrong" ], 201);
            }
    }


    public function deleteUser(Request $request){


            $objUserlist = new Userlist();
            $res = $objUserlist->deleteUserDetails($request);
            if($res){
                return response()->json([
                    "message"=> "User details sucessfully deleted",
                    "status" => "success",
                ], 200);
            }else{
                return response()->json([
                    "message"=> "Something goes to wrong.Please try again later.",
                    "status" => "fail"
                ], 200);
            }
    }
}
