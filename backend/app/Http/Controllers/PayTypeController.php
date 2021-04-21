<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class PayTypeController extends Controller
{

    //GET ALL PAYMENTS
    public function all(Request $request)
    {
        $SQL = "SELECT
                payments.id, 
                payments.name
                FROM 
                payments";
        $payments = DB::select($SQL);

        return json_encode($payments);
    }

    //GET ONE PAYMENT
    public function single(Request $request)
    {
        
        $SQL =  "SELECT
                payments.id, 
                payments.name
                FROM 
                payments
                WHERE 
                (payments.id=".$request->id.")";
        $users = DB::select($SQL);

        return json_encode($users);
    }

    //CREATE A NEW PAYMENT
    public function create(Request $request)
    { 
        $SQL = "INSERT INTO 
                payments 
                (payments.name,
                payments.created_at,
                payments.updated_at)
                VALUES 
                ('".$request->name."',
                '".NOW()."',
                '".NOW()."')";
        try{
            DB::insert($SQL);
            $id = DB::getPdo()->lastInsertId();
        }
        catch(\Exception $e){
        dd($e->getMessage());
        }
        return json_encode(200);
    }

    //UPDATE PAYMENTS
    public function store(Request $request)
    { 
        $SQL = "UPDATE 
                payments 
                SET
                payments.name='".$request->name."', 
                payments.updated_at='".NOW()."'
                WHERE
                (payments.id=".$request->id.")";
        try{
            DB::update($SQL);
        }
        catch(\Exception $e){
        dd($e->getMessage());
        }        
        return json_encode(200);
    }

    //DELETE PAYMENTS
    public function delete(Request $request)
    { 
        $SQL = "DELETE 
                FROM 
                payments
                WHERE
                (payments.id=".$request->id.")";
        try{
            DB::delete($SQL);
        }
        catch(\Exception $e){
        dd($e->getMessage());
        }
        
        return json_encode(200);

    }
}