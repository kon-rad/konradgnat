'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Book status enum
const BookStatus = {
  0: 'Unread',
  1: 'Reading',
  2: 'Completed'
};

// Book format enum
const BookFormat = {
  0: 'Physical',
  1: 'Digital',
  2: 'Audio'
};

export default function Bookshelf() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchBooks();
  }, [supabase]);

  async function fetchBooks() {
    const { data, error } = await supabase
      .from('blog_book')
      .select('*')
      .order('created_on', { ascending: false });

    console.log('books data: ', data);
    data && setBooks(data);
    setLoading(false);
  }

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().slice(0, 10);
  };

  const renderHeading = () => {
    if (loading) {
      return (
        <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">
          Loading books...
        </h1>
      );
    } else if (!books.length) {
      return (
        <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">
          No books added yet.
        </h1>
      );
    } else {
      return (
        <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">
          My Bookshelf
        </h1>
      );
    }
  };

  return (
    <div className="flex justify-center content__container">
      <div className="max-w-6xl w-full">
        {renderHeading()}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {books.map((book: any) => (
            <div key={book.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <div className="flex gap-4">
                {book.image_url && (
                  <div className="w-1/3">
                    <div className="aspect-[3/4] relative overflow-hidden rounded-md">
                      <img
                        src={book.image_url}
                        alt={book.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                )}
                <div className="w-2/3">
                  <h2 className="text-xl font-semibold line-clamp-2">
                    {book.title}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {book.author}
                  </p>
                  <div className="mt-2 text-sm">
                    <p className="text-gray-500">
                      Status: {BookStatus[book.book_status]}
                    </p>
                    <p className="text-gray-500">
                      Format: {BookFormat[book.book_format]}
                    </p>
                    {book.read_on && (
                      <p className="text-gray-500">
                        Read on: {formatDate(book.read_on)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {book.preview && (
                <p className="text-gray-600 mt-4 text-sm italic">
                  "{book.preview}"
                </p>
              )}
              <p className="text-gray-400 mt-2 text-xs">
                Added: {formatDate(book.created_on)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
