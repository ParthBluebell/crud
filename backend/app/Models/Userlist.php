<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Userlist extends Model
{
    use HasFactory;
    protected $table  = 'users';
    protected $fillable = ["firstname","lastname","email","userimage","birthdate","department","isPermanent","gender","id"];

    public function getUserList($request){

        $fillterCol = ["firstname","lastname","email","department","gender"];

        $query = Userlist::select("firstname","lastname","email","userimage","birthdate","department","isPermanent","gender" , "id")
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
        return Userlist::select("firstname","lastname","email","userimage","birthdate","department","isPermanent","gender","id")
                        ->where("is_deleted","N")
                        ->where("usertype","U")
                        ->where("id",$userId)
                        ->get();
    }

    public function addUser($request){

        $data = json_decode($request->input('data') , true );

        $checkMail = $this->checkemail($data['email']);

        if($checkMail == 0){
            $objUser = new Userlist();
            $objUser->firstname = $data['firstname'];
            $objUser->lastname = $data['lastname'];
            $objUser->email = $data['email'];

            if ($request->file('userimage')) {
                $image = $request->file('userimage');
                $userimage = time() . '.' . $image->getClientOriginalExtension();
                $destinationPath = public_path('/upload/user/');
                $image->move($destinationPath, $userimage);
                $objUser->userimage = $userimage;
            }

            $objUser->birthdate = date("Y-m-d" , strtotime($data['dateofbirth']));
            $objUser->department = $data['department'];
            $objUser->isPermanent = $data['isPermanent'];

            $objUser->gender = $data['gender'];
            $objUser->usertype = "U";
            $objUser->is_deleted = "N";
            $objUser->created_at = date("Y-m-d h:i:s");
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

            if ($request->file('userimage')) {
                $image = $request->file('userimage');
                $userimage = time() . '.' . $image->getClientOriginalExtension();
                $destinationPath = public_path('/upload/user/');
                $image->move($destinationPath, $userimage);
                $objUser->userimage = $userimage;
            }

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

    public function deleteUserDetails($request){
        $data = json_decode($request->input('data'), true);
        $userImage = Userlist::select("userimage")
                    ->where("id",$data)
                    ->get();

        if ($userImage[0]->userimage) {
            $path = './public/upload/user/' . $userImage[0]->userimage;
            if (file_exists($path)) {
                unlink($path);
            }
        }
        return Userlist::where("id",$data)->delete();

        // $objUser = Userlist::find($request->input('userId'));
        // $objUser->is_deleted = "Y";
        // $objUser->updated_at = date("Y-m-d h:i:s");
        // return $objUser->save();
    }
}
