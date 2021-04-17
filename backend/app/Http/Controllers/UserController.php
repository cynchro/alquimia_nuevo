<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{

    //GET ALL USERS
    public function all(Request $request)
    {
        $SQL = "SELECT
                users.id, 
                users.name,
                users.email,
                roles.name AS role_name
                FROM 
                users
                INNER JOIN
                user_roles
                ON
                users.id=user_roles.user_id
                INNER JOIN
                roles
                ON
                user_roles.role_id=roles.id";
        $users = DB::select($SQL);

        return json_encode($users);
    }

    //GET ONE USER
    public function single(Request $request)
    {
        
        $SQL =  "SELECT
                users.id, 
                users.name, 
                users.email, 
                roles.name AS role_name
                FROM 
                users 
                INNER JOIN
                user_roles
                ON
                users.id=user_roles.user_id
                INNER JOIN
                roles
                ON
                user_roles.role_id=roles.id
                WHERE (users.id=".$request->id.")";
        $users = DB::select($SQL);

        return json_encode($users);
    }

    //CREATE A NEW USER
    public function create(Request $request)
    { 
        $SQL = "INSERT INTO 
                users 
                (name, 
                email,
                password,
                created_at,
                updated_at)
                VALUES 
                ('".$request->name."',
                '".$request->email."',
                '".Hash::make($request->password)."',
                '".NOW()."',
                '".NOW()."')";
        try{
            DB::insert($SQL);
            $id = DB::getPdo()->lastInsertId();
        }
        catch(\Exception $e){
        dd($e->getMessage());
        }
        app(\App\Http\Controllers\RoleController::class)->createRoleUser($id,$request->role);
        return json_encode(200);
    }

    //UPDATE USER
    public function store(Request $request)
    { 
        $SQL = "UPDATE 
                users 
                SET
                name='".$request->name."', 
                email='".$request->email."',
                updated_at='".NOW()."'
                WHERE
                (id=".$request->id.")";
        try{
            DB::update($SQL);
        }
        catch(\Exception $e){
        dd($e->getMessage());
        }
        
        if(!empty($request->role)){
        app(\App\Http\Controllers\RoleController::class)->updateRoleUser($request->id,$request->role);
        }
        
        return json_encode(200);
    }

    //DELETE USER
    public function delete(Request $request)
    { 
        $SQL = "DELETE 
                FROM 
                users
                WHERE
                (id=".$request->id.")";
        try{
            DB::delete($SQL);
        }
        catch(\Exception $e){
        dd($e->getMessage());
        }
        app(\App\Http\Controllers\RoleController::class)->deleteRoleUser($request->id);
        
        return json_encode(200);

    }
}