"use client";

import { useState, useEffect } from "react";
import { Typography, Grid, IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";

import Card1 from "../cards/Card1";
import CustomPagination from "../shared/CustomPagination";
import { TravelSkeleton } from "./Skeleton";

import { useArticleLikes } from "@/app/hooks/useArticleLikes";
import { useThemeContext } from "@/app/context/ThemeContext";

const FavoritesPage = () => {
  const { favorites, loading, removeFromFavorites } = useArticleLikes(); // Custom hook managing all favorite logic
const {themeData}=useThemeContext()
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Slice favorites for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFavorites = favorites.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {loading ? (
        <div className="flex justify-center py-10">
          <TravelSkeleton />
        </div>
      ) : favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
          <Typography>No favorite articles yet.</Typography>
          <Button variant="contained" color="primary" className="mt-4" href="/">
            Explore Articles
          </Button>
        </div>
      ) : (
        <>
          <Grid container spacing={2}>
            {currentFavorites.map((article) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={article?._id}>
                <div className="relative h-full">
                  <Link href={`/news/${article.slug}`} className="block">
                    <Card1
                      article={article}
                      category={article.category?.name}
                      imageUrl={article.image_url}
                      title={article.title}
                      height="250px"
                      showFavourite={false}
                    />
                  </Link>

                  {/* Delete icon outside the link */}
                  <IconButton
                    onClick={() => removeFromFavorites(article?._id)}
                    className="!absolute top-2 right-2 z-10 rounded-full hover:bg-gray-200 transition" size="small" sx={{color:themeData?.icon?.default,background:themeData?.icon?.main}}
                  >
                    <DeleteIcon fontSize="small"/>
                  </IconButton>
                </div>
              </Grid>

            ))}
          </Grid>

          <CustomPagination
            totalItems={favorites.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
};

export default FavoritesPage;
