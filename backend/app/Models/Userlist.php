<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Services;
use DB;
use GuzzleHttp\Psr7\Request;

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
    }

    public function addUser($request){
        // print_r($request->input('services'));
        // die();
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
                foreach($request->input('services') as $key => $value){
                    $objServices = new Services();
                    $objServices->user_id = $id;
                    $objServices->name = $value['name'];
                    $objServices->description = $value['description'];
                    $objServices->amount = $value['amount'];
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
                    $objServices->name = $value['service_name'];
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

    public function editUser_new($request){
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
    public function editUser($request){
        $checkMail = $this->checkemail($request->input('email'),$request->input('key'));
        if($checkMail == 0){

            $objUser = Userlist::find($request->input('key'));
            $objUser->firstname = $request->input('firstname');
            $objUser->lastname = $request->input('lastname');
            $objUser->email = $request->input('email');
            $objUser->birthdate = date("Y-m-d" , strtotime($request->input('dateofbirth')));
            $objUser->department = $request->input('department');
            $objUser->isPermanent = $request->input('isPermanent');
            $objUser->gender = $request->input('gender');
            $objUser->updated_at = date("Y-m-d h:i:s");

            if($objUser->save()){
                Services::where("user_id",$request->input('key'))->delete();

                foreach($request->input('services') as $key => $value){
                    $objServices = new Services();
                    $objServices->user_id = $request->input('key');
                    $objServices->name = $value['name'];
                    $objServices->description = $value['description'];
                    $objServices->amount = $value['amount'];
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

    public function deleteUserDetails($userId){
        $res = Services::where("user_id",$userId)->delete();
        if($res){
            return Userlist::where("id",$userId)->delete();
        }else{
            return false;
        }


    }

    public function getUserDetailsNew($userId){
        return Userlist::with('relation')->where('id',1)->get();
    }
}
