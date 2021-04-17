<?php
namespace App\Http\Controllers;
Use Exception;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClientsController extends Controller
{
    public function all(Request $request)
    {
        $SQL = "SELECT
                clients.id,
                clients.name, 
                clients.email,
                clients.phone_number,
                clients.address,
                clients.city,
                clients.ruc
                FROM 
                clients
                ";
        $clients = DB::select($SQL);

        return json_encode($clients);
    }

    public function single(Request $request)
    {
        $SQL =  "SELECT
                clients.id,
                clients.name, 
                clients.email,
                clients.phone_number,
                clients.address,
                clients.city,
                clients.ruc
                FROM 
                clients
                WHERE (clients.id=".$request->id.")";
        $clients = DB::select($SQL);

        return json_encode($clients);
    }

    public function create(Request $request)
    { 
        $SQL = "INSERT INTO 
                clients 
                (clients.name, 
                clients.email,
                clients.phone_number,
                clients.address,
                clients.city,
                clients.ruc,
                created_at,
                updated_at)
                VALUES 
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
                clients 
                SET
                clients.name='".$request->name."', 
                clients.email='".$request->email."',
                clients.phone_number=".$request->phone_number.",
                clients.address='".$request->address."',
                clients.city='".$request->city."',
                clients.ruc=".$request->ruc.",
                updated_at='".NOW()."'
                WHERE
                (clients.id=".$request->id.")";
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
                clients
                WHERE
                (clients.id=".$request->id.")";
        try{
            DB::delete($SQL);
        }
        catch(Exception $e){
        dd($e->getMessage());
        }
        
        return json_encode(200);
    }
}