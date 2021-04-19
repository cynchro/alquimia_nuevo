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
                clientsContact.id,
                clientsContact.client_id,
                clientsContact.name, 
                clientsContact.email,
                clientsContact.phone_number,
                clientsContact.address,
                clientsContact.city,
                clientsContact.ruc
                FROM 
                clientsContact
                WHERE
                clientsContact.client_id=".$request->id."";
        $contacts = DB::select($SQL);

        return json_encode($contacts);
    }

    public function single(Request $request)
    {
        
        $SQL =  "SELECT
                clientsContact.id,
                clientsContact.client_id,
                clientsContact.name, 
                clientsContact.email,
                clientsContact.phone_number,
                clientsContact.address,
                clientsContact.city,
                clientsContact.ruc
                FROM 
                clientsContact
                WHERE (clientsContact.id=".$request->id.")";
        $contacts = DB::select($SQL);

        return json_encode($contacts);
    }

    public function create(Request $request)
    { 
        $SQL = "INSERT INTO 
                clientsContact 
                (clientsContact.client_id,
                clientsContact.name, 
                clientsContact.email,
                clientsContact.phone_number,
                clientsContact.address,
                clientsContact.city,
                clientsContact.created_at,
                clientsContact.updated_at)
                VALUES 
                (".$request->cli.",
                '".$request->name."',
                '".$request->email."',
                ".$request->phone_number.",
                '".$request->address."',
                '".$request->city."',
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
                clientsContact 
                SET
                clientsContact.name='".$request->name."', 
                clientsContact.email='".$request->email."',
                clientsContact.phone_number=".$request->phone_number.",
                clientsContact.address='".$request->address."',
                clientsContact.city='".$request->city."',
                clientsContact.updated_at='".NOW()."'
                WHERE
                (clientsContact.id=".$request->id.")";
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
                clientsContact
                WHERE
                (clientsContact.id=".$request->id.")";
        try{
            DB::delete($SQL);
        }
        catch(Exception $e){
        dd($e->getMessage());
        }
        
        return json_encode(200);
    }
}