'use client';
import { useEffect, useState } from "react";
import { axiosClient } from "@/utils/axiosClient";
import { Spinner } from "@/components/spinner";
import Link from "next/link";

export default function Home({searchParams}:{
  searchParams:{
    category:string;
  },
}) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        let response;
        if (searchParams.category) {
          response = await axiosClient.get(`/api/article?category=${searchParams.category}`);
        } else {
          response = await axiosClient.get('/api/article');
        }
        setArticles(response.data.data);
      } catch (error) {
        console.error(error);
      }finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [searchParams.category]);

  if (loading) {
    return <Spinner />; // Display spinner while loading
  }

  return (
    <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-6">Latest News</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.length > 0 ? (
          articles.map((article) => (
            <div key={article.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={`http://localhost:8000/${article.image}`} alt={article.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{article.title}</h3>
                <p className="text-gray-600 mb-4">
                  {article.description}
                </p>
                <Link href={'article/'+article.id} className="text-blue-600 font-semibold">
                  Read more &rarr;
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No articles available.</p>
        )}
      </div>
    </main>
  );
}
