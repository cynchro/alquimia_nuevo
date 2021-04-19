<?php
namespace App\Http\Controllers;
Use Exception;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductsController extends Controller
{
    public function all(Request $request)
    {
        $SQL = "SELECT
                products.id,
                products.item,
                products.description,
                products.barcode,
                products.china,
                products.uy,
                products.may,
                products.stock,
                products.stock_min,
                products.created_at,
                products.updated_at
                FROM 
                products
                ";
        $clients = DB::select($SQL);

        return json_encode($clients);
    }

    public function single(Request $request)
    {
        $SQL =  "SELECT
                products.id,
                products.item,
                products.description,
                products.barcode,
                products.china,
                products.uy,
                products.may,
                products.stock,
                products.stock_min,
                products.created_at,
                products.updated_at
                FROM 
                products
                WHERE (products.id=".$request->id.")";
        $clients = DB::select($SQL);

        return json_encode($clients);
    }

    public function create(Request $request)
    { 
        $SQL = "INSERT INTO 
                products 
                (products.item,
                products.description,
                products.barcode,
                products.china,
                products.uy,
                products.may,
                products.stock,
                products.stock_min,
                products.created_at,
                products.updated_at)
                VALUES 
                ('".$request->item."',
                '".$request->description."',
                ".$request->barcode.",
                '".$request->china."',
                '".$request->uy."',
                '".$request->may."',
                ".$request->stock.",
                ".$request->stock_min.",
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
                products 
                SET
                products.item='".$request->item."',
                products.description='".$request->description."',
                products.barcode=".$request->barcode.",
                products.china='".$request->china."',
                products.uy='".$request->uy."',
                products.may='".$request->may."',
                products.stock=".$request->stock.",
                products.stock_min=".$request->stock_min.",
                products.updated_at='".NOW()."'
                WHERE
                (products.id=".$request->id.")";
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
                products
                WHERE
                (products.id=".$request->id.")";
        try{
            DB::delete($SQL);
        }
        catch(Exception $e){
        dd($e->getMessage());
        }
        
        return json_encode(200);
    }
}