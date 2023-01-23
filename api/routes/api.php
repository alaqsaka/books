<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\AuthenticationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Books
Route::post('/books', [BookController::class, 'store'])->middleware(('auth:sanctum'));
Route::patch('/books/{id}/edit', [BookController::class, 'update'])->middleware(('auth:sanctum'))->middleware('book-access');
Route::delete('/books/{id}', [BookController::class, 'destroy'])->middleware(('auth:sanctum'))->middleware('book-access');
Route::get('/books', [BookController::class, 'index'])->middleware(['auth:sanctum']);
Route::get('/books/{id}', [BookController::class, 'show'])->middleware(['auth:sanctum']);

// Users
Route::post('/register', [AuthenticationController::class, 'register']);
Route::post('/login', [AuthenticationController::class, 'login']);
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/logout', [AuthenticationController::class, 'logout']);
    Route::get('/user', [AuthenticationController::class, 'getUserProfile']);
});

