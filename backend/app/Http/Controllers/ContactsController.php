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

class ContactsController extends Controller
{
    public function all(Request $request)
    {
        $SQL = "SELECT
                contacts.id,
                contacts.name, 
                contacts.email,
                contacts.phone_number,
                contacts.address,
                contacts.city,
                contacts.ruc
                FROM 
                contacts
                ";
        $contacts = DB::select($SQL);

        return json_encode($contacts);
    }

    public function single(Request $request)
    {
        
        $SQL =  "SELECT
                contacts.id,
                contacts.client_id,
                contacts.name, 
                contacts.email,
                contacts.phone_number,
                contacts.address,
                contacts.city,
                contacts.ruc
                FROM 
                contacts
                WHERE (contacts.id=1)";
        $contacts = DB::select($SQL);

        return json_encode($contacts);
    }

    public function create(Request $request)
    { 
        $SQL = "INSERT INTO 
                contacts 
                (contacts.client_id,
                contacts.name, 
                contacts.email,
                contacts.phone_number,
                contacts.address,
                contacts.city,
                contacts.ruc,
                created_at,
                updated_at)
                VALUES 
                ".$request->cli.",
                ('".$request->name."',
                '".$request->email."',
                ".$request->phone_number.",
                '".$request->address."',
                '".$request->city."',
                ".$request->ruc.",
                '".NOW()."',
                '".NOW()."')";
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
                contacts 
                SET
                contacts.name='".$request->name."', 
                contacts.email='".$request->email."',
                contacts.phone_number=".$request->phone_number.",
                contacts.address='".$request->address."',
                contacts.city='".$request->city."',
                contacts.ruc=".$request->ruc.",
                updated_at='".NOW()."'
                WHERE
                (contacts.id=".$request->id.")";
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
                contacts
                WHERE
                (contacts.id=".$request->id.")";
        try{
            DB::delete($SQL);
        }
        catch(Exception $e){
        dd($e->getMessage());
        }
        
        return json_encode(200);
    }
}