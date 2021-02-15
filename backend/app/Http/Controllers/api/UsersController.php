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


    public function addUser_new(Request $request){
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


    public function addUser(Request $request){

        $messages = [
            'firstname.required' => 'Please enter user firstname',
            'lastname.required' => 'Please enter user lastname',
            'email.required' => 'Please enter user email',
            'email.email' => 'Please enter vaild user email ',
            'department.required' => 'Please select user department',
            'gender.required' => 'Please enter select gender',
            'dateofbirth.required' => 'Please enter user dateofbirth',
            'isPermanent.required' => 'Please select user type'
        ];

        $validator = Validator::make($request->all(), [
            'firstname' => 'required',
            'lastname' => 'required',
            'email' => 'required|email',
            'department' => 'required',
            'gender' => 'required',
            'dateofbirth' => 'required',
            'isPermanent' => 'required'
        ],$messages);

        if ($validator->fails()) {
            $error = $validator->errors();

            return response()->json([
                "message"=> $this->one_validation_message($validator),
                "status" => "warning"
            ], 200);

            $result['status'] = '404';
            $result['message'] =
            $result['data'] = json_decode("{}");
        }else{

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
    }


    public function editUser(Request $request, $userId){
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

    public function userDetails(Request $request, $userId){
        $objUserlist = new Userlist();
        $res = $objUserlist->getuserDetails($userId);

        if($res){
            return response()->json(["message"=> "User details sucessfully found" , 'details' => $res ], 200);
        }else{
            return response()->json(["message"=> "Something goess to wrong" ], 201);
        }
    }


    public function deleteUser(Request $request,$userId){


            $objUserlist = new Userlist();
            $res = $objUserlist->deleteUserDetails($userId);
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

    public function getuserslist(Request $request,$userId){
        $objUserlist = new Userlist();
        $res = $objUserlist->getUserDetailsNew($userId);
        return $res;
    }
}



