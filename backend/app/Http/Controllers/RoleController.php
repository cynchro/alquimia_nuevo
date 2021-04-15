<?php
namespace App\Http\Controllers;

Use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class RoleController extends Controller
{
    public function all()
    {
        $SQL =  "SELECT
                id,
                name
                FROM
                roles";
        $roles = DB::select($SQL);

        return json_encode($roles);

    }

    public function single(Request $request)
    {
        
        $SQL =  "SELECT
                roles.id, 
                roles.name
                FROM 
                roles
                WHERE 
                (roles.id=".$request->id.")";
        $rol = DB::select($SQL);

        return json_encode($rol);
    }

    public function create(Request $request)
    {
        $SQL = "INSERT INTO 
                roles 
                (name)
                VALUES 
                ('".$request->name."')";
        try{
            DB::insert($SQL);
        }
        catch(Exception $e){
        dd($e->getMessage());
        }
        return json_encode(200);
    }

    public function store(Request $request)
    { 
        
        $SQL = "UPDATE 
                roles 
                SET
                name='".$request->name."'
                WHERE
                (id=".$request->id.")";
        try{
            DB::update($SQL);
        }
        catch(Exception $e){
        dd($e->getMessage());
        }        
        return json_encode(200);
    }

    public function delete(Request $request)
    { 
        $SQL = "DELETE 
                FROM 
                roles
                WHERE
                (id=".$request->id.")";
        try{
            DB::delete($SQL);
        }
        catch(Exception $e){
        dd($e->getMessage());
        }
        return json_encode(200);
    }

    public function createRoleUser($user, $role)
    {

        $SQL = "INSERT INTO 
                user_roles 
                (user_id, 
                role_id)
                VALUES 
                (".$user.",
                ".$role.")";
        try{
            DB::insert($SQL);
        }
        catch(Exception $e){
        dd($e->getMessage());
        }
        return json_encode(200);
    }

    public function updateRoleUser($user, $role)
    {

        $SQL = "UPDATE 
                user_roles
                SET
                user_id=".$user.",
                role_id=".$role." 
                WHERE 
                (user_id=".$user.")";
        try{
            DB::insert($SQL);
        }
        catch(Exception $e){
        dd($e->getMessage());
        }
        return json_encode(200);
    }

    public function deleteRoleUser($user)
    {

        $SQL = "DELETE
                FROM
                user_roles 
                WHERE 
                (user_id=".$user.")";
        try{
            DB::delete($SQL);
        }
        catch(Exception $e){
        dd($e->getMessage());
        }
        return json_encode(200);
    }

    
}