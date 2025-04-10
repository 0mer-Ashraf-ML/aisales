export interface company {
    id: string;
    company_name: string;
    dba?: string;
    products_services?: string[];
    buyer_industries?: string[];
    web_url?: string;
    target_region?: string[];
    target_industries?: string[];
    preferred_company_size?: string;
    preferred_contact_department?: string[];
    preferred_industry_keywords?: string[];
    tech_stack?: string[];
    user_id: string;
    created_at: Date;
    updated_at: Date;
  }