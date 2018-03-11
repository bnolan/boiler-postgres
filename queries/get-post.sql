/*
 * Get a post
 */

SELECT 
  *
FROM 
  posts
WHERE
  id = $1::integer;