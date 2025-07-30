// Utility functions for image handling

export const compressImage = (file: File, maxWidth: number = 1024, quality: number = 0.8): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;

      // Draw and compress
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedDataUrl);
    };

    img.src = URL.createObjectURL(file);
  });
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Please upload a valid image file (JPEG, PNG, or WebP)'
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'Image file size must be less than 10MB'
    };
  }

  return { valid: true };
};

// Room type validation and mapping
export const roomTypeMapping = {
  'living-room': 'Living Room',
  'bedroom': 'Bedroom',
  'dining-room': 'Dining Room',
  'kitchen': 'Kitchen',
  'bathroom': 'Bathroom',
  'office': 'Office',
  'outdoor': 'Outdoor Space'
};

export const validateRoomType = (roomType: string): boolean => {
  return Object.keys(roomTypeMapping).includes(roomType);
};

// Prompt enhancement for better AI results
export const enhancePrompt = (prompt: string, roomType: string): string => {
  const baseEnhancement = "Professional interior design, high quality, realistic lighting, modern aesthetic";
  const roomSpecific = roomTypeMapping[roomType as keyof typeof roomTypeMapping] || roomType;
  
  return `${prompt}. ${roomSpecific} interior design. ${baseEnhancement}.`;
};
