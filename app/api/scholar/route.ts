import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const scholarId = searchParams.get("scholarId");

  if (!scholarId) {
    return NextResponse.json(
      { error: "Scholar ID is required" },
      { status: 400 }
    );
  }

  try {
    // Fetch Google Scholar profile page
    const url = `https://scholar.google.com/citations?user=${scholarId}&hl=en`;
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    const $ = cheerio.load(response.data);
    const publications: any[] = [];

    // Parse publications from the page
    $(".gsc_a_tr").each((index, element) => {
      const title = $(element).find(".gsc_a_at").text().trim();
      const link =
        "https://scholar.google.com" +
        $(element).find(".gsc_a_at").attr("href");
      const authors = $(element).find(".gsc_a_at").next().text().trim();
      const venue = $(element).find(".gs_gray").last().text().trim();
      const year = $(element).find(".gsc_a_y span").text().trim();
      const citations = $(element)
        .find(".gsc_a_c a")
        .text()
        .trim();

      if (title) {
        publications.push({
          title,
          authors,
          venue,
          year,
          citations: citations || "0",
          link,
        });
      }
    });

    // Get citation stats
    const stats = {
      totalCitations: $("#gsc_rsb_st tbody tr")
        .first()
        .find("td")
        .eq(1)
        .text()
        .trim(),
      hIndex: $("#gsc_rsb_st tbody tr").eq(1).find("td").eq(1).text().trim(),
      i10Index: $("#gsc_rsb_st tbody tr").eq(2).find("td").eq(1).text().trim(),
    };

    return NextResponse.json({
      publications,
      stats,
    });
  } catch (error: any) {
    console.error("Google Scholar API Error:", error.message);
    return NextResponse.json(
      {
        error: "Failed to fetch publications",
        details: error.message,
        note: "Google Scholar may be blocking automated requests. Consider using a proxy or API service.",
      },
      { status: 500 }
    );
  }
}
