<?php
namespace App\Http\Controllers;
Use Exception;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SalesController extends Controller
{
    public function verify(Request $request)
    {
        $SQL = "SELECT
                sales.id,
                sales.customer_id,
                sales.user_id,
                sales.status
                FROM
                sales
                WHERE
                (sales.user_id=".$request->user_id.")
                AND
                (sales.status=1)
                ";
        $sales = DB::select($SQL);
        if(empty($sales)){
            $this->create($request->user_id);
        }else{
            return $this->getSale($request->user_id);
        }
    }

    public function create($user_id)
    {
        $SQL = "INSERT INTO
                sales
                (sales.user_id,
                sales.status,
                sales.discount,
                sales.total,
                sales.payment,
                sales.dues,
                sales.created_at,
                sales.updated_at
                )
                VALUES
                (".$user_id.",
                1,
                '0.00',
                '0.00',
                '0.00',
                '0.00',
                '".NOW()."',
                '".NOW()."')";
        try{
            DB::insert($SQL);
        }
        catch(Exception $e){
        dd($e->getMessage());
        }
        return $this->getSale($user_id);
    }

    public function getSale($user_id)
    {
        $SQL = "SELECT
                sales.id,
                sales.customer_id,
                sales.user_id,
                sales.payment_id,
                sales.comments,
                sales.status,
                sales.discount,
                sales.total,
                sales.payment,
                sales.dues
                FROM
                sales
                WHERE
                (sales.user_id=".$user_id.")
                AND
                (sales.status=1)
                ";
        $sale = DB::select($SQL);
            echo json_encode($sale);
        }

    public function items(Request $request)
    {
        $SQL = "SELECT
                salesItems.id,
                salesItems.sale_id,
                salesItems.products_id,
                salesItems.selling_price,
                salesItems.quantity,
                salesItems.total,
                products.description,
                products.may
                FROM
                salesItems
                INNER JOIN
                products
                ON 
                salesItems.products_id=products.id
                WHERE
                (salesItems.sale_id=".$request->id.")
                ";
        $items = DB::select($SQL);
            return json_encode($items);
    }

    public function itemsAdd(Request $request)
    {
                $SQL = "INSERT INTO 
                salesItems 
                (salesItems.sale_id, 
                salesItems.products_id,
                salesItems.selling_price,
                salesItems.quantity,
                salesItems.total,
                salesItems.created_at,
                salesItems.updated_at)
                VALUES 
                (".$request->sale_id.",
                ".$request->products_id.",
                '".$request->selling_price."',
                '".$request->quantity."',
                '".$request->selling_price."',
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

    public function itemsDel(Request $request)
    {
                $SQL = "DELETE FROM 
                salesItems
                WHERE
                (id=".$request->item_id.")";
        try{
            DB::delete($SQL);
        }
        catch(Exception $e){
        dd($e->getMessage());
        }

        return json_encode(200);
    }

    /*
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
    }*/
}