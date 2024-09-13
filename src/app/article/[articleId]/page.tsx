'use client'
import { axiosClient } from "@/utils/axiosClient";
import { useEffect, useState } from "react"
import { Spinner } from "@/components/spinner";
import Link from 'next/link';


export default function ArticleDetails({params}:{
    params: {articleId: string}}){

        const [article,setArticle] = useState(null);
        const [relatedArticles, setRelatedArticles] = useState([]);
        const [loading, setLoading] = useState(true);

        useEffect(()=>{
            fetchData()
        },[params.articleId]);

        const fetchData = async()=>{
            try{
                const response = await axiosClient.get('/api/article/'+params.articleId);
                setArticle(response.data.article);
                setRelatedArticles(response.data.related_articles);
                
            }catch(error){
                console.error(error)
            }finally {
                setLoading(false);
              }
        }

        if (loading) {
            return <Spinner />; // Display spinner while loading
          }

        const formatDate = (dateString:string) => {
            const date = new Date(dateString);
            const month = date.toLocaleString('default', { month: '2-digit' }); 
            const year = date.getFullYear(); 
            return `${month}, ${year}`;
          };
    
    return (
        
        <div className="bg-gray-100">
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    News Portal
                </h1>
            </div>
        </header>
    
       
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <article className="bg-white shadow-md rounded-lg p-6">
             
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Breaking News: {article.title}</h1>
    
                <div className="flex items-center space-x-4 mb-6">
                <img src={`http://localhost:8000/${article.author?.avatar}`} alt={article.title} className="h-12 w-12 rounded-full"/>
                    <div>
                        <p className="text-gray-700 font-semibold">By {article.author?.name}</p>
                        <p className="text-gray-500 text-sm">Published on September {formatDate(article?.published_at)}</p>
                    </div>
                </div>
    
             
                <img className="w-full h-64 object-cover rounded-lg mb-6" src={`http://localhost:8000/${article.image}`} alt="News Image"/>
    
           
                <div className="prose max-w-none mb-8">
                    <p>In a stunning turn of events, Tailwind CSS has become the most popular CSS framework in the world. Developers from all over have praised its utility-first approach and rapid prototyping abilities.</p>
                    <p>Experts believe that the growing adoption of Tailwind is a testament to its simplicity and flexibility. "We have seen a significant shift in the way developers write CSS," says Jane Smith, a senior developer at TechCorp.</p>
                    <h2>Why Tailwind?</h2>
                    <p>Tailwind’s rise to fame can be attributed to its comprehensive documentation, ease of use, and strong community support. Its utility-first approach allows developers to rapidly build custom designs without writing custom CSS.</p>
                    <p>Many developers now choose Tailwind as their primary styling framework for its clear advantages in speed and consistency.</p>
                </div>
    
              
                <div className="flex space-x-2">
                    <span className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full">#TailwindCSS</span>
                    <span className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full">#WebDevelopment</span>
                    <span className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full">#CSS</span>
                </div>
            </article>
    
            
            <section className="mt-12">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Related Articles</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 
                 {relatedArticles.map(relatedArticle=>{
                    return(
                        <div key={relatedArticle.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img src={`http://localhost:8000/${relatedArticle.image}`} alt={relatedArticle.title} className="w-full h-48 object-cover" />
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">{relatedArticle.title}</h3>
                          <p className="text-gray-600 mb-4">
                            {relatedArticle.description}
                          </p>
                          <Link href={'/article/'+relatedArticle.id} className="text-blue-600 font-semibold">
                            Read more &rarr;
                          </Link>
                        </div>
                      </div>
                    )
                 })}
                </div>
            </section>
        </main>
        </div>
      )
}