<?php
namespace App\Http\Controllers;

Use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;


class PasswordController extends Controller
{

    public function update(Request $request)
    {

        $SQL = "UPDATE 
                users
                SET
                password='".Hash::make($request->password)."',
                updated_at='".NOW()."' 
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
    
}