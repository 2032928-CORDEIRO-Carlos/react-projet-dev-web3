import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="text-center py-20">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-lg text-gray-700 mb-6">
        Oups! La page que vous cherchez n'existe pas.
      </p>
      <Link to="/" className="text-blue-600 hover:underline">
        Retour à l'accueil
      </Link>
    </section>
  );
}
