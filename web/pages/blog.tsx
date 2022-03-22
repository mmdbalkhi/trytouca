// Copyright 2021 Touca, Inc. Subject to Apache-2.0 License.

import { NextSeo } from 'next-seo';
import React from 'react';

import Header from '@/components/header';
import {
  Article,
  BlogPostArchive,
  BlogPostArticle,
  getArticles
} from '@/lib/blog';

interface PageContent {
  title: string;
  subtitle: string;
  featured: string;
}

const content: PageContent = {
  title: 'The Touca Times',
  subtitle:
    'Notes on our journey towards making software easier to maintain and safer to release.',
  featured: 'launch-vision'
};

type StaticProps = {
  archived_articles: Article[];
  main_article: Article;
};

export default function BlogPage(props: StaticProps) {
  return (
    <>
      <NextSeo title="Blog" canonical="https://touca.io/blog" />
      <Header></Header>
      <section className="bg-gradient-to-b from-dark-blue-900 to-dark-blue-800">
        <div className="wsl-min-h-screen-1 container mx-auto flex flex-col justify-center">
          <div className="grid grid-cols-1 gap-4 space-y-8 p-8 lg:grid-cols-2 lg:space-y-0">
            <div className="col-span-1 grid place-content-center">
              <div className="max-w-lg space-y-4 text-white">
                <h3 className="text-4xl font-bold lg:text-5xl">
                  {content.title}
                </h3>
                <p className="text-xl font-light text-sky-200 lg:text-2xl">
                  {content.subtitle}
                </p>
              </div>
            </div>
            <div className="col-span-1">
              <BlogPostArticle
                article={props.main_article}
                featured={true}></BlogPostArticle>
            </div>
          </div>
        </div>
      </section>
      {props.archived_articles.length !== 0 && (
        <section className="wsl-min-h-screen-1 bg-dark-blue-900">
          <BlogPostArchive articles={props.archived_articles}></BlogPostArchive>
        </section>
      )}
    </>
  );
}

export async function getStaticProps() {
  const articles = getArticles();
  const main_article = articles.find((v) => v.slug === content.featured);
  const archived_articles = articles.filter((v) => v.slug !== content.featured);
  return {
    props: {
      archived_articles,
      main_article
    }
  };
}