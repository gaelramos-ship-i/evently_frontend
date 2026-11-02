const getImageUrl = (imagePath) => {
  if (!imagePath) return ''

  // Les nouvelles images Supabase ont déjà une URL complète.
  if (imagePath.startsWith('http')) return imagePath

  // Les anciennes images sont encore hébergées sur le backend.
  const assetsBaseUrl = import.meta.env.VITE_ASSETS_URL.replace(/\/+$/, '')
  return `${assetsBaseUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`
}

export default getImageUrl