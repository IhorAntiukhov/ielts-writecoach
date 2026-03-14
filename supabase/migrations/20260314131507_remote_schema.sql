


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."EssayType" AS ENUM (
    'task-1G',
    'task-1A',
    'task-2'
);


ALTER TYPE "public"."EssayType" OWNER TO "postgres";


CREATE TYPE "public"."FeedbackAvailability" AS ENUM (
    'no-feedback',
    'reactions-only',
    'reactions-and-comments'
);


ALTER TYPE "public"."FeedbackAvailability" OWNER TO "postgres";


CREATE TYPE "public"."ReactionType" AS ENUM (
    'Clear and Natural',
    'Good Ideas',
    'Well Structured',
    'Language needs Work',
    'Hard to Follow'
);


ALTER TYPE "public"."ReactionType" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_essay_reviews"("p_user_id" "uuid", "time_interval" integer, "essay_type" "public"."EssayType" DEFAULT NULL::"public"."EssayType") RETURNS TABLE("type" "public"."EssayType", "task_response_band" real, "task_response_feedback" "text", "coherence_band" real, "coherence_feedback" "text", "vocabulary_band" real, "vocabulary_feedback" "text", "grammar_band" real, "grammar_feedback" "text")
    LANGUAGE "plpgsql"
    SET "search_path" TO 'public'
    AS $$
begin
  return query
  select e.type, r.task_response_band, r.task_response_feedback, r.coherence_band, r.coherence_feedback, r.vocabulary_band, r.vocabulary_feedback, r.grammar_band, r.grammar_feedback
  from essays e
  left join reviews r on r.essay_id = e.id
  where extract(day from (now() - e.created_at)) <= time_interval and ((essay_type is not null and e.type = essay_type) or essay_type is null) and e.user_id = p_user_id
  order by e.created_at;
end
$$;


ALTER FUNCTION "public"."get_essay_reviews"("p_user_id" "uuid", "time_interval" integer, "essay_type" "public"."EssayType") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_user_analytics"("p_user_id" "uuid", "time_interval" integer, "essay_type" "public"."EssayType" DEFAULT NULL::"public"."EssayType") RETURNS TABLE("created_at" timestamp with time zone, "task_response_band" real, "coherence_band" real, "vocabulary_band" real, "grammar_band" real, "words_to_time_ratio" double precision)
    LANGUAGE "plpgsql"
    SET "search_path" TO 'public'
    AS $$
begin
  return query
  select e.created_at, r.task_response_band, r.coherence_band, r.vocabulary_band, r.grammar_band, coalesce((e.word_count::double precision / nullif((e.time::double precision / 60), 0)), 0) as words_to_time_ratio
  from essays e
  left join reviews r on r.essay_id = e.id
  where extract(day from (now() - e.created_at)) <= time_interval and ((essay_type is not null and e.type = essay_type) or essay_type is null) and e.user_id = p_user_id
  order by e.created_at desc;
end
$$;


ALTER FUNCTION "public"."get_user_analytics"("p_user_id" "uuid", "time_interval" integer, "essay_type" "public"."EssayType") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_user_essay_counts"("p_user_id" "uuid", "time_interval" integer) RETURNS TABLE("type" "public"."EssayType", "essay_count" bigint)
    LANGUAGE "plpgsql"
    SET "search_path" TO 'public'
    AS $$begin
  return query
  select e.type, count(*) as essay_count
  from essays e
  where extract(day from (now() - e.created_at)) <= time_interval and e.user_id = p_user_id
  group by e.type;
end$$;


ALTER FUNCTION "public"."get_user_essay_counts"("p_user_id" "uuid", "time_interval" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_user_reaction_counts"("p_user_id" "uuid", "time_interval" integer, "essay_type" "public"."EssayType" DEFAULT NULL::"public"."EssayType") RETURNS TABLE("type" "public"."ReactionType", "reaction_count" bigint)
    LANGUAGE "plpgsql"
    SET "search_path" TO 'public'
    AS $$begin
  return query
  select re.reaction_type, count(*) as reaction_count
  from reactions re
  left join essays e on e.id = re.essay_id
  where extract(day from (now() - re.created_at)) <= time_interval and ((essay_type is not null and e.type = essay_type) or essay_type is null) and e.user_id = p_user_id
  group by re.reaction_type;
end;$$;


ALTER FUNCTION "public"."get_user_reaction_counts"("p_user_id" "uuid", "time_interval" integer, "essay_type" "public"."EssayType") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_user_stats"("p_user_id" "uuid", "is_public_profile" boolean) RETURNS TABLE("total_essays_count" bigint, "average_band_score" double precision, "total_reactions_left" bigint, "total_comments_left" bigint)
    LANGUAGE "plpgsql"
    SET "search_path" TO 'public'
    AS $$BEGIN
  RETURN QUERY
  SELECT
  (
    SELECT COUNT(*)
    FROM essays e
    WHERE e.user_id = p_user_id AND ((is_public_profile = true AND e.is_public = true) OR is_public_profile = false)
  ) as total_essays_count,

  (
    SELECT COALESCE(AVG(r.average_band_score), 0)
    FROM reviews r
    JOIN essays e ON e.id = r.essay_id
    WHERE r.user_id = p_user_id AND ((is_public_profile = true AND e.is_public = true) OR is_public_profile = false)
  ) as average_band_score,

  (
    SELECT COUNT(*)
    FROM reactions r
    WHERE r.user_id = p_user_id
  ) AS total_reactions_left,

  (
    SELECT COUNT(*)
    FROM comments c
    WHERE c.user_id = p_user_id
  ) AS total_comments_left
  LIMIT 1;
END;$$;


ALTER FUNCTION "public"."get_user_stats"("p_user_id" "uuid", "is_public_profile" boolean) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_essay_reaction"("reaction_type" "public"."ReactionType", "essay_id" integer, "user_id" "uuid") RETURNS "void"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'public'
    AS $$
declare old_reaction_type "ReactionType";
begin
  select r.reaction_type into old_reaction_type from public.reactions r where r.essay_id = handle_essay_reaction.essay_id and r.user_id = handle_essay_reaction.user_id;

  if old_reaction_type is not null then
    if old_reaction_type = reaction_type then
      delete from reactions r
      where r.essay_id = handle_essay_reaction.essay_id and r.user_id = handle_essay_reaction.user_id;
    else
      update reactions
      set reaction_type = handle_essay_reaction.reaction_type
      where reactions.essay_id = handle_essay_reaction.essay_id and reactions.user_id = handle_essay_reaction.user_id;
    end if;
  else
    insert into reactions
    (reaction_type, essay_id, user_id)
    values (reaction_type, essay_id, user_id);
  end if;
end
$$;


ALTER FUNCTION "public"."handle_essay_reaction"("reaction_type" "public"."ReactionType", "essay_id" integer, "user_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
BEGIN
  INSERT INTO public.profiles (id, user_name, avatar_url)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."save_essay_analysis"("task_response_band" double precision, "task_response_feedback" "text", "coherence_band" double precision, "coherence_feedback" "text", "vocabulary_band" double precision, "vocabulary_feedback" "text", "grammar_band" double precision, "grammar_feedback" "text", "essay_id" integer, "user_id" "uuid") RETURNS "void"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'public'
    AS $$BEGIN
  if ((SELECT id FROM public.reviews WHERE save_essay_analysis.essay_id = reviews.essay_id) IS NULL) THEN
    INSERT INTO reviews (task_response_band, task_response_feedback, coherence_band, coherence_feedback, vocabulary_band, vocabulary_feedback, grammar_band, grammar_feedback, essay_id, user_id)
    VALUES (task_response_band, task_response_feedback, coherence_band, coherence_feedback, vocabulary_band, vocabulary_feedback, grammar_band, grammar_feedback, essay_id, user_id);
  ELSE
    UPDATE reviews
    SET task_response_band = save_essay_analysis.task_response_band,
    task_response_feedback = save_essay_analysis.task_response_feedback,
    coherence_band = save_essay_analysis.coherence_band,
    coherence_feedback = save_essay_analysis.coherence_feedback,
    vocabulary_band = save_essay_analysis.vocabulary_band,
    vocabulary_feedback = save_essay_analysis.vocabulary_feedback,
    grammar_band = save_essay_analysis.grammar_band,
    grammar_feedback = save_essay_analysis.grammar_feedback
    WHERE reviews.essay_id = save_essay_analysis.essay_id;
  END IF;
END$$;


ALTER FUNCTION "public"."save_essay_analysis"("task_response_band" double precision, "task_response_feedback" "text", "coherence_band" double precision, "coherence_feedback" "text", "vocabulary_band" double precision, "vocabulary_feedback" "text", "grammar_band" double precision, "grammar_feedback" "text", "essay_id" integer, "user_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."save_global_report"("p_start_date" timestamp with time zone, "p_end_date" timestamp with time zone, "p_report" "text", "p_user_id" "uuid") RETURNS "void"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'public'
    AS $$
declare same_interval_report_id integer;
begin
  select id into same_interval_report_id
  from global_reports gb
  where gb.start_date::date = p_start_date::date and gb.end_date::date = p_end_date and gb.user_id = p_user_id;

  if same_interval_report_id is null then
    insert into global_reports
    (start_date, end_date, report, user_id)
    values (P_start_date, p_end_date, p_report, p_user_id);
  else
    update global_reports
    set gb.report = p_report
    where gb.id = same_interval_report_id;
  end if;
end
$$;


ALTER FUNCTION "public"."save_global_report"("p_start_date" timestamp with time zone, "p_end_date" timestamp with time zone, "p_report" "text", "p_user_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
BEGIN
  UPDATE public.profiles
  SET user_name = NEW.raw_user_meta_data->>'name', avatar_url = NEW.raw_user_meta_data->>'avatar_url'
  WHERE profiles.id = NEW.id;
  RETURN NEW;
END
$$;


ALTER FUNCTION "public"."update_user"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."comments" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "text" "text" NOT NULL,
    "essay_id" bigint NOT NULL,
    "user_id" "uuid" NOT NULL
);


ALTER TABLE "public"."comments" OWNER TO "postgres";


ALTER TABLE "public"."comments" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."comments_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."essays" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "type" "public"."EssayType" NOT NULL,
    "instructions" "text" NOT NULL,
    "image_url" "text",
    "time" integer,
    "response" "text" NOT NULL,
    "is_public" boolean DEFAULT false NOT NULL,
    "user_id" "uuid" NOT NULL,
    "word_count" smallint NOT NULL,
    "image_width" integer,
    "image_height" integer,
    "ts_vector" "tsvector" GENERATED ALWAYS AS ("to_tsvector"('"english"'::"regconfig", "instructions")) STORED NOT NULL,
    "feedback_availability" "public"."FeedbackAvailability" DEFAULT 'reactions-and-comments'::"public"."FeedbackAvailability" NOT NULL
);


ALTER TABLE "public"."essays" OWNER TO "postgres";


ALTER TABLE "public"."essays" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."essays_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."global_reports" (
    "id" bigint NOT NULL,
    "start_date" timestamp with time zone NOT NULL,
    "end_date" timestamp with time zone DEFAULT "now"() NOT NULL,
    "report" "text" NOT NULL,
    "user_id" "uuid" NOT NULL
);


ALTER TABLE "public"."global_reports" OWNER TO "postgres";


ALTER TABLE "public"."global_reports" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."global_reports_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."reactions" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "reaction_type" "public"."ReactionType" NOT NULL,
    "essay_id" bigint NOT NULL,
    "user_id" "uuid" NOT NULL
);


ALTER TABLE "public"."reactions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."reviews" (
    "id" bigint NOT NULL,
    "task_response_band" real NOT NULL,
    "task_response_feedback" "text" NOT NULL,
    "coherence_band" real NOT NULL,
    "coherence_feedback" "text" NOT NULL,
    "vocabulary_band" real NOT NULL,
    "vocabulary_feedback" "text" NOT NULL,
    "grammar_band" real NOT NULL,
    "grammar_feedback" "text" NOT NULL,
    "essay_id" bigint NOT NULL,
    "user_id" "uuid" NOT NULL,
    "average_band_score" double precision GENERATED ALWAYS AS ((((("task_response_band" + "coherence_band") + "vocabulary_band") + "grammar_band") / (4)::double precision)) STORED,
    "full_rewrite" "text"
);


ALTER TABLE "public"."reviews" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."private_essay_feed" WITH ("security_invoker"='on') AS
 SELECT "e"."id",
    "e"."created_at",
    "e"."type",
    "e"."instructions",
    "e"."image_url",
    "e"."image_width",
    "e"."image_height",
    "e"."response",
    "e"."ts_vector",
    "e"."is_public",
    "e"."user_id",
    "e"."feedback_availability",
    COALESCE("r"."average_band_score", (0)::double precision) AS "average_band_score",
    COALESCE(( SELECT "count"(*) AS "count"
           FROM "public"."reactions" "re"
          WHERE ("re"."essay_id" = "e"."id")), (0)::bigint) AS "reactions_count",
    ( SELECT "re"."reaction_type"
           FROM "public"."reactions" "re"
          WHERE ("re"."essay_id" = "e"."id")
          GROUP BY "re"."reaction_type"
          ORDER BY ("count"(*)) DESC
         LIMIT 1) AS "top_reaction",
    COALESCE(( SELECT "count"(*) AS "count"
           FROM "public"."comments" "c"
          WHERE ("c"."essay_id" = "e"."id")), (0)::bigint) AS "comments_count",
    "r"."id" AS "review_id",
    "r"."task_response_band",
    "r"."coherence_band",
    "r"."vocabulary_band",
    "r"."grammar_band"
   FROM ("public"."essays" "e"
     LEFT JOIN "public"."reviews" "r" ON (("e"."id" = "r"."essay_id")));


ALTER VIEW "public"."private_essay_feed" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_name" "text" NOT NULL,
    "avatar_url" "text"
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."public_essay_feed" WITH ("security_invoker"='on') AS
 SELECT "e"."id",
    "e"."created_at",
    "e"."type",
    "e"."instructions",
    "e"."image_url",
    "e"."image_width",
    "e"."image_height",
    "e"."response",
    "e"."ts_vector",
    "e"."user_id",
    "e"."feedback_availability",
    "e"."average_band_score",
    "e"."reactions_count",
    "e"."top_reaction",
    "e"."comments_count",
    "e"."review_id",
    "e"."task_response_band",
    "e"."coherence_band",
    "e"."vocabulary_band",
    "e"."grammar_band",
    "p"."user_name",
    "p"."avatar_url"
   FROM ("public"."private_essay_feed" "e"
     JOIN "public"."profiles" "p" ON (("e"."user_id" = "p"."id")))
  WHERE ("e"."is_public" = true);


ALTER VIEW "public"."public_essay_feed" OWNER TO "postgres";


ALTER TABLE "public"."reactions" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."reactions_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



ALTER TABLE "public"."reviews" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."reviews_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



ALTER TABLE ONLY "public"."comments"
    ADD CONSTRAINT "comments_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."essays"
    ADD CONSTRAINT "essays_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."global_reports"
    ADD CONSTRAINT "global_reports_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."reactions"
    ADD CONSTRAINT "reactions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."reviews"
    ADD CONSTRAINT "reviews_pkey" PRIMARY KEY ("id");



CREATE INDEX "essay_feed_order_idx" ON "public"."essays" USING "btree" ("created_at" DESC, "id");



CREATE INDEX "essays_ts_idx" ON "public"."essays" USING "gin" ("ts_vector");



ALTER TABLE ONLY "public"."comments"
    ADD CONSTRAINT "comments_essay_id_fkey" FOREIGN KEY ("essay_id") REFERENCES "public"."essays"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."comments"
    ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."essays"
    ADD CONSTRAINT "essays_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."global_reports"
    ADD CONSTRAINT "global_reports_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."reactions"
    ADD CONSTRAINT "reactions_essay_id_fkey" FOREIGN KEY ("essay_id") REFERENCES "public"."essays"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."reactions"
    ADD CONSTRAINT "reactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."reviews"
    ADD CONSTRAINT "reviews_essay_id_fkey" FOREIGN KEY ("essay_id") REFERENCES "public"."essays"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."reviews"
    ADD CONSTRAINT "reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



CREATE POLICY "Enable all for users based on user_id" ON "public"."global_reports" TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable delete for users based on user_id" ON "public"."comments" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable delete for users based on user_id" ON "public"."essays" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable delete for users based on user_id" ON "public"."profiles" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "id"));



CREATE POLICY "Enable delete for users based on user_id" ON "public"."reactions" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable delete for users based on user_id" ON "public"."reviews" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable insert for users based on user_id" ON "public"."comments" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable insert for users based on user_id" ON "public"."essays" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable insert for users based on user_id" ON "public"."profiles" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "id"));



CREATE POLICY "Enable insert for users based on user_id" ON "public"."reactions" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable insert for users based on user_id" ON "public"."reviews" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable read access for all users" ON "public"."comments" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."profiles" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."reactions" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Enable select for users based on user_id" ON "public"."essays" FOR SELECT TO "authenticated" USING (((( SELECT "auth"."uid"() AS "uid") = "user_id") OR ("is_public" = true)));



CREATE POLICY "Enable select for users based on user_id and is_public" ON "public"."reviews" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."essays"
  WHERE (("essays"."id" = "reviews"."essay_id") AND (("essays"."is_public" = true) OR ("essays"."user_id" = ( SELECT "auth"."uid"() AS "uid")))))));



CREATE POLICY "Enable update for users based on user_id" ON "public"."comments" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable update for users based on user_id" ON "public"."essays" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable update for users based on user_id" ON "public"."profiles" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "id")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "id"));



CREATE POLICY "Enable update for users based on user_id" ON "public"."reactions" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable updated for users based on user_id" ON "public"."reviews" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



ALTER TABLE "public"."comments" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."essays" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."global_reports" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."reactions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."reviews" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

























































































































































GRANT ALL ON FUNCTION "public"."get_essay_reviews"("p_user_id" "uuid", "time_interval" integer, "essay_type" "public"."EssayType") TO "anon";
GRANT ALL ON FUNCTION "public"."get_essay_reviews"("p_user_id" "uuid", "time_interval" integer, "essay_type" "public"."EssayType") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_essay_reviews"("p_user_id" "uuid", "time_interval" integer, "essay_type" "public"."EssayType") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_user_analytics"("p_user_id" "uuid", "time_interval" integer, "essay_type" "public"."EssayType") TO "anon";
GRANT ALL ON FUNCTION "public"."get_user_analytics"("p_user_id" "uuid", "time_interval" integer, "essay_type" "public"."EssayType") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_user_analytics"("p_user_id" "uuid", "time_interval" integer, "essay_type" "public"."EssayType") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_user_essay_counts"("p_user_id" "uuid", "time_interval" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."get_user_essay_counts"("p_user_id" "uuid", "time_interval" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_user_essay_counts"("p_user_id" "uuid", "time_interval" integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."get_user_reaction_counts"("p_user_id" "uuid", "time_interval" integer, "essay_type" "public"."EssayType") TO "anon";
GRANT ALL ON FUNCTION "public"."get_user_reaction_counts"("p_user_id" "uuid", "time_interval" integer, "essay_type" "public"."EssayType") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_user_reaction_counts"("p_user_id" "uuid", "time_interval" integer, "essay_type" "public"."EssayType") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_user_stats"("p_user_id" "uuid", "is_public_profile" boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."get_user_stats"("p_user_id" "uuid", "is_public_profile" boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_user_stats"("p_user_id" "uuid", "is_public_profile" boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_essay_reaction"("reaction_type" "public"."ReactionType", "essay_id" integer, "user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."handle_essay_reaction"("reaction_type" "public"."ReactionType", "essay_id" integer, "user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_essay_reaction"("reaction_type" "public"."ReactionType", "essay_id" integer, "user_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."save_essay_analysis"("task_response_band" double precision, "task_response_feedback" "text", "coherence_band" double precision, "coherence_feedback" "text", "vocabulary_band" double precision, "vocabulary_feedback" "text", "grammar_band" double precision, "grammar_feedback" "text", "essay_id" integer, "user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."save_essay_analysis"("task_response_band" double precision, "task_response_feedback" "text", "coherence_band" double precision, "coherence_feedback" "text", "vocabulary_band" double precision, "vocabulary_feedback" "text", "grammar_band" double precision, "grammar_feedback" "text", "essay_id" integer, "user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."save_essay_analysis"("task_response_band" double precision, "task_response_feedback" "text", "coherence_band" double precision, "coherence_feedback" "text", "vocabulary_band" double precision, "vocabulary_feedback" "text", "grammar_band" double precision, "grammar_feedback" "text", "essay_id" integer, "user_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."save_global_report"("p_start_date" timestamp with time zone, "p_end_date" timestamp with time zone, "p_report" "text", "p_user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."save_global_report"("p_start_date" timestamp with time zone, "p_end_date" timestamp with time zone, "p_report" "text", "p_user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."save_global_report"("p_start_date" timestamp with time zone, "p_end_date" timestamp with time zone, "p_report" "text", "p_user_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."update_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_user"() TO "service_role";


















GRANT ALL ON TABLE "public"."comments" TO "anon";
GRANT ALL ON TABLE "public"."comments" TO "authenticated";
GRANT ALL ON TABLE "public"."comments" TO "service_role";



GRANT ALL ON SEQUENCE "public"."comments_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."comments_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."comments_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."essays" TO "anon";
GRANT ALL ON TABLE "public"."essays" TO "authenticated";
GRANT ALL ON TABLE "public"."essays" TO "service_role";



GRANT ALL ON SEQUENCE "public"."essays_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."essays_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."essays_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."global_reports" TO "anon";
GRANT ALL ON TABLE "public"."global_reports" TO "authenticated";
GRANT ALL ON TABLE "public"."global_reports" TO "service_role";



GRANT ALL ON SEQUENCE "public"."global_reports_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."global_reports_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."global_reports_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."reactions" TO "anon";
GRANT ALL ON TABLE "public"."reactions" TO "authenticated";
GRANT ALL ON TABLE "public"."reactions" TO "service_role";



GRANT ALL ON TABLE "public"."reviews" TO "anon";
GRANT ALL ON TABLE "public"."reviews" TO "authenticated";
GRANT ALL ON TABLE "public"."reviews" TO "service_role";



GRANT ALL ON TABLE "public"."private_essay_feed" TO "anon";
GRANT ALL ON TABLE "public"."private_essay_feed" TO "authenticated";
GRANT ALL ON TABLE "public"."private_essay_feed" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON TABLE "public"."public_essay_feed" TO "anon";
GRANT ALL ON TABLE "public"."public_essay_feed" TO "authenticated";
GRANT ALL ON TABLE "public"."public_essay_feed" TO "service_role";



GRANT ALL ON SEQUENCE "public"."reactions_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."reactions_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."reactions_id_seq" TO "service_role";



GRANT ALL ON SEQUENCE "public"."reviews_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."reviews_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."reviews_id_seq" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































drop extension if exists "pg_net";

CREATE TRIGGER on_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER on_user_updated AFTER UPDATE ON auth.users FOR EACH ROW EXECUTE FUNCTION public.update_user();


  create policy "Give users access to own folder 1oj01fe_0"
  on "storage"."objects"
  as permissive
  for select
  to authenticated
using (((bucket_id = 'avatars'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));



  create policy "Give users access to own folder 1oj01fe_1"
  on "storage"."objects"
  as permissive
  for insert
  to authenticated
with check (((bucket_id = 'avatars'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));



  create policy "Give users access to own folder 1oj01fe_2"
  on "storage"."objects"
  as permissive
  for update
  to authenticated
using (((bucket_id = 'avatars'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));



  create policy "Give users access to own folder 1oj01fe_3"
  on "storage"."objects"
  as permissive
  for delete
  to authenticated
using (((bucket_id = 'avatars'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));



  create policy "Give users access to own folder kst30a_0"
  on "storage"."objects"
  as permissive
  for select
  to public
using (((bucket_id = 'essay_images'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));



  create policy "Give users access to own folder kst30a_1"
  on "storage"."objects"
  as permissive
  for insert
  to public
with check (((bucket_id = 'essay_images'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));



  create policy "Give users access to own folder kst30a_2"
  on "storage"."objects"
  as permissive
  for update
  to public
using (((bucket_id = 'essay_images'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));



  create policy "Give users access to own folder kst30a_3"
  on "storage"."objects"
  as permissive
  for delete
  to public
using (((bucket_id = 'essay_images'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));



