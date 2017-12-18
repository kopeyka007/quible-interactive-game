<?php

namespace App\Http\Controllers;

use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;
use App\Word;
use App\Category;

class WordsController extends Controller
{
    use Helpers;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $words = Word::with("categories")->paginate(25);
        return $words;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();

        $word = Word::create($input);

        $categories =  $request->get('categories', []);
        $word->categories()->sync($categories);

        return $this->response->created();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Word::find($id);
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
        $name =  $request->get('name', '');
        $level =  $request->get('level', '');
        $categories =  $request->get('categories', []);
        

        $word = Word::find($id);
        $word->name = $name;
        $word->level = $level;
        $word->update();

        $word->categories()->sync($categories);

        return Response()->json(['updated'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $word = Word::find($id);

        $word->categories()->detach();
        $word->delete();

        return Response()->json([], 204);
    }
}
