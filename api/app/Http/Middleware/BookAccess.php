<?php

namespace App\Http\Middleware;

use App\Models\Book;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        // Middleware untuk cek apakah buku yang ingin diakses adalah buku user yang sedang login

        // Mendapatkan data user yang sedang login
        $currentLoggedInUser = Auth::user();

        // Mendapatkan buku yang ingin diakses
        try {
            $book = Book::findOrFail($request->id);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Book ID not found'], 404);
        }

        // Cek apakah dari id currentLoggedInUser dan user_id book adalah sama
        if($book->user_id != $currentLoggedInUser->id) {
            return response()->json(['message' => "This action is unauthorized."], 403);
        }

        return $next($request);
    }
}
