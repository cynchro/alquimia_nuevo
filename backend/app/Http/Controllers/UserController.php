<?php
namespace App\Http\Controllers;
Use Exception;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');
        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 400);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

               
       $SQL = "SELECT
               user_roles.user_id,
               user_roles.role_id,
               roles.id,
               roles.name
               FROM
               user_roles
               INNER JOIN
               roles
               ON
               (user_roles.role_id=roles.id)
               WHERE
               (user_roles.user_id=".JWTAuth::User()->id.")
               ";
       $rol = DB::select($SQL);

       $roles = array();
       
       foreach($rol as $role) {
            
           $roleArr = [
               $role->name
           ];

           $roles[] = $roleArr;
       }
       $data = array();

       $data = array(
           "id"=>JWTAuth::User()->id, 
           "username"=>JWTAuth::User()->name,
           "email"=>JWTAuth::User()->email,
           "roles"=>$roleArr,
           "token"=>$token,
           "tokenType"=>"Bearer"
       );
       return $data;die;
    }
    
    public function getAuthenticatedUser()
    {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['token_absent'], $e->getStatusCode());
        }
        return response()->json(compact('user'));
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);
        
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        
        $user = User::create([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
        ]);
        
        $token = JWTAuth::fromUser($user);
        
        return response()->json(compact('user','token'),201);
    }

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
        catch(Exception $e){
        dd($e->getMessage());
        }
        app(\App\Http\Controllers\RoleController::class)->createRoleUser($id,$request->role);
        return json_encode(200);
    }

    public function update(Request $request)
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
        catch(Exception $e){
        dd($e->getMessage());
        }
        
        if(!empty($request->role)){
        app(\App\Http\Controllers\RoleController::class)->updateRoleUser($request->id,$request->role);
        }
        
        return json_encode(200);
    }

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
        catch(Exception $e){
        dd($e->getMessage());
        }
        app(\App\Http\Controllers\RoleController::class)->deleteRoleUser($request->id);
        
        return json_encode(200);
    }
}