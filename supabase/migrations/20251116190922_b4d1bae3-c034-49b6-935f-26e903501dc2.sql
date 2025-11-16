-- Create enum for gender
CREATE TYPE gender_type AS ENUM ('male', 'female', 'other', 'prefer_not_to_say');

-- Create enum for schools
CREATE TYPE school_type AS ENUM ('SCI', 'SEAC', 'SPA', 'SBE', 'Nursing', 'Engineering');

-- Create enum for year of study
CREATE TYPE year_type AS ENUM ('1', '2', '3', '4', '5', '6');

-- Create members table
CREATE TABLE public.members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  gender gender_type,
  email TEXT NOT NULL UNIQUE,
  phone_number TEXT NOT NULL,
  county TEXT DEFAULT 'Embu',
  constituency TEXT NOT NULL,
  ward TEXT,
  school school_type NOT NULL,
  year_of_study year_type NOT NULL,
  skills TEXT,
  why_join TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create events table
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  venue TEXT NOT NULL,
  event_date TIMESTAMPTZ NOT NULL,
  poster_url TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create gallery table
CREATE TABLE public.gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create user roles table for admin management
CREATE TYPE app_role AS ENUM ('admin', 'member');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'member',
  UNIQUE(user_id, role)
);

-- Enable RLS
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check admin role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS Policies for members table
-- Anyone can insert (public registration)
CREATE POLICY "Anyone can register as member"
ON public.members
FOR INSERT
WITH CHECK (true);

-- Only admins can view all members
CREATE POLICY "Admins can view all members"
ON public.members
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can update members
CREATE POLICY "Admins can update members"
ON public.members
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete members
CREATE POLICY "Admins can delete members"
ON public.members
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for events table
-- Anyone can view events
CREATE POLICY "Anyone can view events"
ON public.events
FOR SELECT
USING (true);

-- Only admins can create events
CREATE POLICY "Admins can create events"
ON public.events
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can update events
CREATE POLICY "Admins can update events"
ON public.events
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete events
CREATE POLICY "Admins can delete events"
ON public.events
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for gallery table
-- Anyone can view gallery
CREATE POLICY "Anyone can view gallery"
ON public.gallery
FOR SELECT
USING (true);

-- Only admins can upload to gallery
CREATE POLICY "Admins can upload to gallery"
ON public.gallery
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete from gallery
CREATE POLICY "Admins can delete from gallery"
ON public.gallery
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_roles table
-- Only admins can view roles
CREATE POLICY "Admins can view roles"
ON public.user_roles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can manage roles
CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public)
VALUES ('emust-images', 'emust-images', true);

-- Storage policies for images
CREATE POLICY "Public can view images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'emust-images');

CREATE POLICY "Admins can upload images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'emust-images' AND
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can delete images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'emust-images' AND
  public.has_role(auth.uid(), 'admin')
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_members_updated_at
BEFORE UPDATE ON public.members
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();