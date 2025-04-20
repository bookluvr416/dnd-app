import { UseFormSetValue, UseFormTrigger, FieldErrors } from 'react-hook-form';
import Button from '@/components/shared/Button';
import Image from 'next/image';
import { useState, useRef } from 'react';
import placeholderImage from '@/assets/image-placeholder.png';
import { FormType } from '@/lib/formSchema/zodSchema';

interface Props {
  errors: FieldErrors<FormType>;
  setValue: UseFormSetValue<FormType>;
  trigger: UseFormTrigger<FormType>;
}

const UploadSection: React.FC<Props> = ({ setValue, trigger, errors }) => {
  const [image, setImage] = useState<string | null>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  /**
   * onClearImage
   * Clears image from input
   */
  const onClearImage = () => {
    if (imgRef && imgRef.current) {
      imgRef.current.value = '';
      setImage(null);
    }
  }

  /**
   * onImageChange
   * Sets image state on image input change, and triggers the zod validation
   * @param event ChangeEvent<HtmlInputElement>
   */
  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].type.includes('image/')) {
        setImage(URL.createObjectURL(event.target.files[0]));
        setValue("characterImage", event.target.files[0], { shouldValidate: true }); // update file in form state
        await trigger("characterImage"); // manually trigger validation for "file" field
      } else {
        onClearImage();
        return;
      }
    } else {
      setImage(null)
    }
  }

  return (
    <div>
      <div className="bg-indigo-950 p-4 rounded-lg text-wrap ring-1 ring-blue-700/50">
        <div className="flex flex-row justify-center pb-3 md:pb-5">
          {image && (
            <Image
              src={image}
              alt='character image'
              width={220}
              height={300}
            />
          )}
          {!image && (
            <Image
              src={placeholderImage}
              alt='placeholder image'
              width={220}
              height={300}
            />
          )}
        </div>
      </div>
      <label
        className="block mb-2 mt-5 text-sm text-indigo-300"
        htmlFor="characterImage"
        aria-label="Character Image"
      >
        <p className='text-lg'>Upload Image</p>
        <p className='text-small'>Max file size: 5mb | Supported image types: png, jpg, jpeg, or webp</p>
      </label>
      <div className='flex flex-row gap-4 flex-wrap items-center justify-between'>
        <div className='flex flex-col flex-1'>
          <input
            className="block w-full p-1 text-sm rounded-lg cursor-pointer
                      focus:outline-none bg-purple-950/60 border border-violet-800"
            id="characterImage"
            name="characterImage"
            type="file"
            accept="image/*"
            onChange={onImageChange}
            ref={imgRef}
          />
        </div>
        
        <Button onClick={onClearImage} text="Clear Image" type="button" />
      </div>
      <div>
        {errors['characterImage']?.message && (
          <p className="text-red-300 pt-1 text-medium">
            {`${errors['characterImage']?.message}`}
          </p>
        )}
      </div>
    </div>
  )
};

export default UploadSection;