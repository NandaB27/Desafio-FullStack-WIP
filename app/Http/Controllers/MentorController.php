<?php

namespace App\Http\Controllers;

use App\Models\Mentor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Database\QueryException;

class MentorController extends Controller
{
    public function index()
    {
        $mentors = Mentor::paginate(4);
        return response()->json($mentors, 200);
    }

    public function store(Request $request)
    {
            try {
                $request->validate(
                    [
                        'name' => 'required|string',
                        'email' => 'required|email',
                        'cpf' => 'required|string'
                    ],
                    [
                        'required' => 'O campo :attribute é obrigatório.',
                        'string' => 'O campo :attribute precisa ser uma string.',
                        'email' => 'O campo :attribute precisa ser um e-mail válido.'

                    ]
                );

                $requestData = $request->all();

                $mentor = Mentor::create($requestData);

                return response()->json([
                    'message' => 'Mentor criado com sucesso!',
                    'mentor' => $mentor
                ], Response::HTTP_CREATED);
            } catch (ValidationException $e) {
                // Tratar exceções de validação
                return response()->json([
                    'message' => $e->getMessage()
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            } catch (QueryException $e) {
                // Tratar exceções de consulta ao banco de dados
                return response()->json([
                    'message' =>  $e->getMessage()
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            } catch (\Throwable $e) {
                return response()->json([
                    'message' => $e->getMessage()
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
    }

    public function update(Request $request, $id) {
    {
            // Validação dos dados recebidos
            $request->validate([
                'name' => 'required|string|max:255',
                'cpf' => 'required|string|max:14',
                'email' => 'required|string|email|max:255|unique:mentors,email,' . $id,
            ]);

            // Encontrar o mentor pelo ID
            $mentor = Mentor::find($id);

            if (!$mentor) {
                return response()->json(['message' => 'Mentor não encontrado.'], 404);
            }

            // Atualizar os dados do mentor
            $mentor->update($request->all());

            return response()->json(['message' => 'Mentor atualizado com sucesso.', 'data' => $mentor], 200);
        }
    }

    public function destroy($id)
    {
        $mentor = Mentor::find($id);

        if (!$mentor) {
            // Retorna um erro se o mentor não for encontrado
            return response()->json(['message' => 'Mentor não encontrado.'], 404);
        }

        // Deleta o mentor
        $mentor->delete();

        // Retorna uma resposta de sucesso
        return response()->json(['message' => 'Mentor removido com sucesso.'], 200);
    }
    public function search(Request $request)
    {
        // Pegue o termo de pesquisa da query string
        $searchTerm = $request->input('query');

        // Realize a consulta para encontrar mentores com base em nome, CPF ou email
        $mentors = Mentor::where('name', 'LIKE', "%{$searchTerm}%")
                        ->orWhere('cpf', 'LIKE', "%{$searchTerm}%")
                        ->orWhere('email', 'LIKE', "%{$searchTerm}%")
                        ->get();

        return response()->json($mentors, 200);
    }

}

