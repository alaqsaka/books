<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookResource;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $books = Book::where('user_id', '=', $user->id)->latest();
        return BookResource::collection(Book::where('user_id', '=', $user->id)->latest()->filter(request(['search']))->paginate(15)->withQueryString());
    }

    public function show($id) {
        try {
        $book = Book::findOrFail($id);

        $user = Auth::user();
        // Check if the current logged user is the owner of the book
        if($book->user_id !== $user->id) {
            return response()->json(['message' => "This action is unauthorized."], 403);
        }

        return response()->json($book);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Book ID not found'], 404);
        }
    }

    public function store(Request $request) {

        $validated = $request->validate([
            'isbn' => 'required|integer',
            'title' => 'required|max:255',
            'subtitle' => 'nullable|string|max:255',
            'author' => 'nullable|string|max:255',
            'published' => 'nullable|date',
            'publisher' => 'nullable|string|max:255',
            'pages' => 'nullable|integer',
            'description' => 'nullable|string',
            'website' => 'nullable|string'
        ]);

        $request['user_id'] = Auth::user()->id;

        $book = Book::create($request->all());

        return response()->json(['message' => 'Book created', "book" => $book]);
    }

    public function update(Request $request, $id) {
        $validated = $request->validate([
            'isbn' => 'required|integer',
            'title' => 'required|max:255',
            'subtitle' => 'nullable|string|max:255',
            'author' => 'nullable|string|max:255',
            'published' => 'nullable|date',
            'publisher' => 'nullable|string|max:255',
            'pages' => 'nullable|integer',
            'description' => 'nullable|string',
            'website' => 'nullable|string'
        ]);

        $book = Book::findOrFail($id);
        $book->update($request->all());

        return response()->json(['message' => 'Book updated', "book" => $book]);
    }

    public function destroy($id) {
        $book = Book::findOrFail($id);

        $book->delete();

        return response()->json(['message' => 'Book deleted', "book" => $book]);
    }
}
