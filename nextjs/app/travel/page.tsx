'use client';

import WorldMap from 'react-svg-worldmap';
import { useState } from 'react';

const visitedCountries = [
  { country: 'pl', name: 'Poland' },
  { country: 'us', name: 'USA' },
  { country: 'ca', name: 'Canada' },
  { country: 'mx', name: 'Mexico' },
  { country: 'gb', name: 'England / United Kingdom' },
  { country: 'ua', name: 'Ukraine' },
  { country: 'de', name: 'Germany' },
  { country: 'pt', name: 'Portugal' },
  { country: 'at', name: 'Austria' },
  { country: 'it', name: 'Italy' },
  { country: 'fr', name: 'France' },
  { country: 'co', name: 'Colombia' },
  { country: 'ar', name: 'Argentina' },
  { country: 'jp', name: 'Japan' },
  { country: 'cn', name: 'China' },
  { country: 'th', name: 'Thailand' },
  { country: 'vn', name: 'Vietnam' },
  { country: 'my', name: 'Malaysia' },
  { country: 'id', name: 'Indonesia' },
  { country: 'kr', name: 'South Korea' },
  { country: 'in', name: 'India' },
];

// Format data for the world map — value 1 for all visited
const mapData = visitedCountries.map((c) => ({
  country: c.country,
  value: 1,
}));

// Group by region for the list
const regions: { label: string; countries: typeof visitedCountries }[] = [
  {
    label: 'Europe',
    countries: visitedCountries.filter((c) =>
      ['pl', 'gb', 'ua', 'de', 'pt', 'at', 'it', 'fr'].includes(c.country)
    ),
  },
  {
    label: 'North America',
    countries: visitedCountries.filter((c) =>
      ['us', 'ca', 'mx'].includes(c.country)
    ),
  },
  {
    label: 'South America',
    countries: visitedCountries.filter((c) =>
      ['co', 'ar'].includes(c.country)
    ),
  },
  {
    label: 'Asia',
    countries: visitedCountries.filter((c) =>
      ['jp', 'cn', 'th', 'vn', 'my', 'id', 'kr', 'in'].includes(c.country)
    ),
  },
];

export default function Travel() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  return (
    <div className="flex justify-center content__container">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">
          Travel
        </h1>
        <p className="text-gray-600 mb-6">
          {visitedCountries.length} countries visited and counting.
          {hoveredCountry && (
            <span className="ml-2 font-medium text-gray-900">
              &mdash; {hoveredCountry}
            </span>
          )}
        </p>

        {/* World Map */}
        <div className="flex justify-center mb-10">
          <div className="w-full max-w-3xl">
            <WorldMap
              color="#227c9d"
              size="xl"
              data={mapData}
            />
          </div>
        </div>

        {/* Country list grouped by region */}
        <h2 className="text-2xl font-semibold mb-4">All Visited Countries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {regions.map((region) => (
            <div key={region.label}>
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">
                {region.label}
              </h3>
              <ul className="space-y-1">
                {region.countries.map((c) => (
                  <li
                    key={c.country}
                    className="text-gray-700 hover:text-gray-900 cursor-default transition-colors"
                    onMouseEnter={() => setHoveredCountry(c.name)}
                    onMouseLeave={() => setHoveredCountry(null)}
                  >
                    {c.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}