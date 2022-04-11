<?php

namespace App\Http\Controllers\API;

use App\Apartment;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class ApartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Apartment::latest()->paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required| string | max:50 | unique:apartments',
            'units' => 'required| integer',
            'location' => 'required | string'
        ]);
        return Apartment::create($request->all() );
    }

    /**
     * Display the specified resource.` 
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $apt = Apartment::findOrFail($id);

        $this->validate($request, [
            'name' => 'required| string | max:50 | sometimes',
            'units' => 'required| integer',
            'location' => 'required | string'
        ]);
        $apt->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $apt = Apartment::findOrFail($id);
        
        $apt->delete();
        return ['message' =>"Apt Deleted"];
    }
}
