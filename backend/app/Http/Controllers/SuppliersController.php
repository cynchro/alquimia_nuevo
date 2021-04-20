<?php
namespace App\Http\Controllers;
Use Exception;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SuppliersController extends Controller
{
    public function all(Request $request)
    {
        $SQL = "SELECT
                suppliers.id,
                suppliers.name, 
                suppliers.email,
                suppliers.phone_number,
                suppliers.address,
                suppliers.city
                FROM 
                suppliers
                ";
        $suppliers = DB::select($SQL);

        return json_encode($suppliers);
    }

    public function single(Request $request)
    {
        $SQL =  "SELECT
                suppliers.id,
                suppliers.name, 
                suppliers.email,
                suppliers.phone_number,
                suppliers.address,
                suppliers.city
                FROM 
                suppliers
                WHERE 
                (suppliers.id=".$request->id.")";
        $suppliers = DB::select($SQL);

        return json_encode($suppliers);
    }

    public function create(Request $request)
    { 
        $SQL = "INSERT INTO 
                suppliers
                (suppliers.name, 
                suppliers.email,
                suppliers.phone_number,
                suppliers.address,
                suppliers.city,
                suppliers.created_at,
                suppliers.updated_at)
                VALUES 
                ('".$request->name."',
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
                suppliers 
                SET
                suppliers.name='".$request->name."', 
                suppliers.email='".$request->email."',
                suppliers.phone_number=".$request->phone_number.",
                suppliers.address='".$request->address."',
                suppliers.city='".$request->city."',
                suppliers.updated_at='".NOW()."'
                WHERE
                (suppliers.id=".$request->id.")";
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
                suppliers
                WHERE
                (suppliers.id=".$request->id.")";
        try{
            DB::delete($SQL);
        }
        catch(Exception $e){
        dd($e->getMessage());
        }
        
        return json_encode(200);
    }
}