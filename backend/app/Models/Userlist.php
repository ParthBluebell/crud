<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Services;
use DB;
class Userlist extends Model
{
    use HasFactory;
    protected $table  = 'users';
    protected $fillable = ["firstname","lastname","email","birthdate","department","isPermanent","gender","id"];

    public function relation(){
            return $this->hasMany('App\Models\Services','user_id','id');
    }

    public function getUserList($request){

        $fillterCol = ["firstname","lastname","email","department","gender"];

        $query = Userlist::select("firstname","lastname","email","birthdate","department","isPermanent","gender" , "id")
                        ->where("is_deleted","N")
                        ->where("usertype","U");

        if($request->input('sortColoum') && $request->input('sortOrder')){
            $query->orderBy($request->input('sortColoum') , $request->input('sortOrder'));
        }

        if($request->input('filterValue')){
            $flag = 0;
            foreach ($fillterCol as $key => $value) {
                if ($flag == 0) {
                    $query->where($value, 'like', '%' . $request->input('filterValue') . '%');
                    $flag = $flag + 1;
                } else {
                    $query->orWhere($value, 'like', '%' . $request->input('filterValue') . '%');
                }
            }
        }

        $result = $query->paginate($request->input('pageSize'));

        return $result;
    }
    public function getUserDetails($userId){

        return Userlist::with('relation')
                        ->select("users.firstname","users.lastname","users.email","users.birthdate","users.department",
                        "users.isPermanent","users.gender","users.id")
                        ->where("users.usertype","U")
                        ->where("users.is_deleted","N")
                        ->where("users.id",$userId)
                        ->get();

        // return Userlist::select("users.firstname","users.lastname","users.email","users.birthdate","users.department",
        //                     "users.isPermanent","users.gender","users.id",
        //                     DB::raw('GROUP_CONCAT(user_services.service_name) AS service_name'),
        //                     DB::raw('GROUP_CONCAT(user_services.service_description) AS service_description'),
        //                     DB::raw('GROUP_CONCAT(user_services.service_amount) AS service_amount'))

        //                 ->join("user_services","user_services.user_id","=","users.id")
        //                 ->where("users.usertype","U")
        //                 ->where("users.is_deleted","N")
        //                 ->where("user_services.is_deleted","N")
        //                 ->where("users.id",$userId)
        //                 ->groupBy("user_services.user_id")
        //                 ->get();
    }

    public function addUser($request){

        // $data = json_decode($request->input('data') , true );


        $checkMail = $this->checkemail($request->input('email'));

        if($checkMail == 0){
            $objUser = new Userlist();
            $objUser->firstname = $request->input('firstname');
            $objUser->lastname = $request->input('lastname');
            $objUser->email = $request->input('email');
            $objUser->birthdate = date("Y-m-d" , strtotime($request->input('dateofbirth')));
            $objUser->department = $request->input('department');
            $objUser->isPermanent = $request->input('isPermanent');
            $objUser->gender = $request->input('gender');
            $objUser->usertype = "U";
            $objUser->is_deleted = "N";
            $objUser->created_at = date("Y-m-d h:i:s");
            $objUser->updated_at = date("Y-m-d h:i:s");
            if($objUser->save()){
                $id = $objUser->id;
                foreach($request->input('itemRows') as $key => $value){
                    $objServices = new Services();
                    $objServices->user_id = $id;
                    $objServices->service_name = $value['service_name'];
                    $objServices->service_description = $value['service_description'];
                    $objServices->service_amount = $value['service_amount'];
                    $objServices->is_deleted =  "N";
                    $objServices->created_at = date("Y-m-d h:i:s");
                    $objServices->updated_at = date("Y-m-d h:i:s");
                    $objServices->save();
                }
                return "true";
            }else{
                return "false";
            }
        }else{
            return "emailExits";
        }
    }


    public function addUser_new($request){

        $data = json_decode($request->input('data') , true );

        $checkMail = $this->checkemail($data['email']);

        if($checkMail == 0){
            $objUser = new Userlist();
            $objUser->firstname = $data['firstname'];
            $objUser->lastname = $data['lastname'];
            $objUser->email = $data['email'];
            $objUser->birthdate = date("Y-m-d" , strtotime($data['dateofbirth']));
            $objUser->department = $data['department'];
            $objUser->isPermanent = $data['isPermanent'];
            $objUser->gender = $data['gender'];
            $objUser->usertype = "U";
            $objUser->is_deleted = "N";
            $objUser->created_at = date("Y-m-d h:i:s");
            $objUser->updated_at = date("Y-m-d h:i:s");
            if($objUser->save()){
                $id = $objUser->id;
                foreach($data['itemRows'] as $key => $value){
                    $objServices = new Services();
                    $objServices->user_id = $id;
                    $objServices->service_name = $value['service_name'];
                    $objServices->service_description = $value['service_description'];
                    $objServices->service_amount = $value['service_amount'];
                    $objServices->is_deleted =  "N";
                    $objServices->created_at = date("Y-m-d h:i:s");
                    $objServices->updated_at = date("Y-m-d h:i:s");
                    $objServices->save();
                }
                return "true";
            }else{
                return "false";
            }
        }else{
            return "emailExits";
        }
    }

    public function checkemail($email ,$id = ''){
        $qurey = Userlist::where("is_deleted","N")
                        ->where("usertype","U")
                        ->where("email",$email);
        if($id){
            $qurey->where("id","!=", $id);
        }
        return $qurey->count();
    }

    public function editUser($request){
        $data = json_decode($request->input('data'), true);
        $checkMail = $this->checkemail($data['email'],$data['key']);
        if($checkMail == 0){
            $objUser = Userlist::find($data['key']);
            $objUser->firstname = $data['firstname'];
            $objUser->lastname = $data['lastname'];
            $objUser->email = $data['email'];
            $objUser->birthdate = date("Y-m-d" , strtotime($data['dateofbirth']));
            $objUser->department = $data['department'];
            $objUser->isPermanent = $data['isPermanent'];
            $objUser->gender = $data['gender'];
            $objUser->updated_at = date("Y-m-d h:i:s");
            if($objUser->save()){
                return "true";
            }else{
                return "false";
            }
        }else{
            return "emailExits";
        }
    }

    public function deleteUserDetails($userId){
        return Userlist::where("id",$userId)->delete();
    }

    public function getUserDetailsNew($userId){
        return Userlist::with('relation')->where('id',1)->get();
    }



}
