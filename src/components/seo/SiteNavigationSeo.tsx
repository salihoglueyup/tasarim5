"use client";

import React from 'react';
import JsonLd from './JsonLd';
import { siteNavigationSchema } from '@/lib/schemas';

interface NavLink {
  name: string;
  url: string;
}

interface SiteNavigationSeoProps {
  links: NavLink[];
}

export default function SiteNavigationSeo({ links }: SiteNavigationSeoProps) {
  const schema = siteNavigationSchema(links);

  return <JsonLd data={[schema]} />;
}
