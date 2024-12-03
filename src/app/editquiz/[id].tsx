import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout"; // Assurez-vous que votre Layout est bien référencé

export default function EditQuiz() {
  const router = useRouter();
  const { id } = router.query; // Récupérer l'ID dynamique depuis l'URL
  const [quiz, setQuiz] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    // S'assurer que l'ID est défini avant d'effectuer la requête
    if (id) {
      const fetchQuiz = async () => {
        try {
          const response = await fetch(`/api/quizz/${id}`);
          if (!response.ok) {
            throw new Error("Erreur lors de la récupération du quiz.");
          }
          const data = await response.json();
          setQuiz(data);
          setTitle(data.title);
          setDescription(data.description);
          setQuestions(data.questions);
        } catch (error) {
          console.error("Erreur :", error);
        }
      };

      fetchQuiz();
    }
  }, [id]);

  const handleSave = async () => {
    if (!id) {
      alert("ID du quiz manquant.");
      return;
    }

    const body = {
      title,
      description,
      questions,
    };

    try {
      const response = await fetch(`/api/quizz/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du quiz.");
      }

      alert("Quiz mis à jour avec succès!");
      router.push("/"); // Redirige vers la page principale après la mise à jour
    } catch (error) {
      console.error("Erreur :", error);
      alert("Erreur lors de la mise à jour du quiz.");
    }
  };

  const handleDelete = async () => {
    if (!id) {
      alert("ID du quiz manquant.");
      return;
    }

    try {
      const response = await fetch(`/api/quizz/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du quiz.");
      }

      alert("Quiz supprimé avec succès!");
      router.push("/"); // Redirige vers la page principale après la suppression
    } catch (error) {
      console.error("Erreur :", error);
      alert("Erreur lors de la suppression du quiz.");
    }
  };

  if (!quiz) {
    return <div>Chargement...</div>;
  }

  return (
    <Layout>
      <div className="flex flex-col items-center min-h-screen px-4 py-8 sm:px-12 bg-black">
        <h1 className="text-4xl text-white font-bold mb-4">Modifier le quiz</h1>
        <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre du quiz"
            className="w-full p-2 mb-4 text-white bg-gray-900 rounded"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description du quiz"
            className="w-full p-2 mb-4 text-white bg-gray-900 rounded"
          />
          {/* Vous pouvez ajouter un formulaire pour modifier les questions ici */}
          <button
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg"
            onClick={handleSave}
          >
            Sauvegarder les modifications
          </button>
          <button
            className="w-full py-2 mt-4 bg-red-500 text-white font-semibold rounded-lg"
            onClick={handleDelete}
          >
            Supprimer le quiz
          </button>
        </div>
      </div>
    </Layout>
  );
}
