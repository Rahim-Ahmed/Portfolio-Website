import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const scholarId = searchParams.get("scholarId");

  if (!scholarId) {
    return NextResponse.json(
      { error: "Scholar ID is required" },
      { status: 400 }
    );
  }

  const serpApiKey = process.env.SERPAPI_KEY;

  if (!serpApiKey) {
    return NextResponse.json(
      { 
        error: "SerpAPI key not configured",
        note: "Please add SERPAPI_KEY to your environment variables"
      },
      { status: 500 }
    );
  }

  try {
    // Use SerpAPI to fetch Google Scholar author data
    const serpApiUrl = `https://serpapi.com/search.json`;
    const params = {
      engine: "google_scholar_author",
      author_id: scholarId,
      api_key: serpApiKey,
      num: 5, // Get top 5 publications
    };

    const response = await axios.get(serpApiUrl, { params });
    const data = response.data;

    // Extract publications
    const publications = (data.articles || []).map((article: any) => ({
      title: article.title || "",
      authors: article.authors || "",
      venue: article.publication || "",
      year: article.year || "",
      citations: article.cited_by?.value?.toString() || "0",
      link: article.link || `https://scholar.google.com/citations?user=${scholarId}`,
    }));

    // Extract citation stats
    const stats = {
      totalCitations: data.cited_by?.table?.[0]?.citations?.all?.toString() || "0",
      hIndex: data.cited_by?.table?.[1]?.h_index?.all?.toString() || "0",
      i10Index: data.cited_by?.table?.[2]?.i10_index?.all?.toString() || "0",
    };

    return NextResponse.json({
      publications,
      stats,
    });
  } catch (error: any) {
    console.error("SerpAPI Error:", error.message);
    
    // Provide helpful error message
    const errorMessage = error.response?.data?.error || error.message;
    
    return NextResponse.json(
      {
        error: "Failed to fetch publications",
        details: errorMessage,
        note: "Check your SerpAPI key and quota. Free tier: 100 searches/month.",
      },
      { status: 500 }
    );
  }
}
