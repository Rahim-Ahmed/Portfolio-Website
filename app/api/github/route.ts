import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  try {
    // Fetch user's repositories with timeout
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`,
      {
        params: {
          sort: "updated",
          per_page: 100,
        },
        headers: {
          Accept: "application/vnd.github.v3+json",
          // Add your GitHub token for higher rate limits (optional)
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          }),
        },
        timeout: 10000, // 10 second timeout
      }
    );

    // Filter and format the repositories
    const repos = response.data
      .filter((repo: any) => !repo.fork) // Exclude forked repos
      .map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        homepage: repo.homepage,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        topics: repo.topics,
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        pushed_at: repo.pushed_at,
      }))
      .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count); // Sort by stars

    return NextResponse.json(repos);
  } catch (error: any) {
    console.error("GitHub API Error:", error.message);
    
    // Return a more helpful error message
    if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
      return NextResponse.json(
        { 
          error: "GitHub API connection timeout", 
          details: "The GitHub API is temporarily unreachable. Please try again later.",
          repos: [] // Return empty array to prevent UI errors
        },
        { status: 200 } // Return 200 to prevent error state in UI
      );
    }
    
    return NextResponse.json(
      { 
        error: "Failed to fetch repositories", 
        details: error.message,
        repos: [] // Return empty array to prevent UI errors
      },
      { status: 200 } // Return 200 to prevent error state in UI
    );
  }
}
