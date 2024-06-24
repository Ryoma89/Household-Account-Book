'use client'
import { useCallback, useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Loading from "@/app/loading";
import * as z from "zod";
import useStore from "@/store/profileStore";
import { useToast } from "@/components/ui/use-toast"
import { currencies } from "@/constants/currencies";
import { Database } from "@/lib/database.types2";

type Schema = z.infer<typeof schema>;

const schema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  introduce: z.string().min(0),
  primary_currency: z
    .string()
    .min(3, { message: "Please select a primary currency." }),
});

const Profile = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [fileMessage, setFileMessage] = useState("");
  const [message, setMessage] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("/default.png");
  const { user } = useStore();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: user.name ? user.name : "",
      introduce: user.introduce ? user.introduce : "",
      primary_currency: user.primary_currency ? user.primary_currency : "USD",
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (user && user.avatar_url) {
      setAvatarUrl(user.avatar_url);
    }
  }, [user]);

  const onUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      setFileMessage("");

      if (!files || files?.length == 0) {
        setFileMessage("画像をアップロードしてください。");
        return;
      }

      const fileSize = files[0].size / 1024 / 1024;
      const fileType = files[0].type;

      if (fileSize > 2) {
        setFileMessage("ファイルサイズは2MB以下にしてください。");
        return;
      }

      if (fileType !== "image/jpeg" && fileType !== "image/png") {
        setFileMessage("JPEGまたはPNG形式の画像をアップロードしてください。");
        return;
      }

      setAvatar(files[0]);
    },
    []
  );

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);
    setMessage('');

    try {
      let avatar_url = user.avatar_url;
      if (avatar) {
        const { data: storageData, error: storageError } = await supabase.storage.from('profile').upload(`${user.id}/${uuidv4()}`, avatar);

        if (storageError) {
          toast({
            title: 'Error',
            description: 'An error occurred while uploading your avatar.',
            variant: 'destructive',
          });
          return;
        }

        if (avatar_url) {
          const fileName = avatar_url.split('/').slice(-1)[0];
          await supabase.storage.from('profile').remove([`${user.id}/${fileName}`]);
        }

        const { data: urlData } = await supabase.storage.from('profile').getPublicUrl(storageData.path);

        avatar_url = urlData.publicUrl;
      }

      const { error: updateError } = await supabase.from('profiles').update({
        name: data.name, introduce: data.introduce,
        avatar_url, primary_currency: data.primary_currency,
      })
        .eq('id', user.id);

      if (updateError) {
        toast({
          title: 'Error',
          description: 'An error occurred while updating your profile.',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: '✅ Success!!',
        description: 'Your profile has been updated.',
      });
      reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred while updating your profile.',
        variant: 'destructive',
      });
      return;
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div>
      <h3 className="text-center font-bold text-3xl mb-10">Profile</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* avatar */}
        <div className="mb-5">
          <div className="flex flex-col text-sm items-center justify-center mb-5">
            <div className="relative w-24 h-24 mb-5">
              <Image
                src={avatarUrl}
                className="rounded-full object-cover"
                alt="avatar"
                fill
              />
            </div>
            <input type="file" id="avatar" onChange={onUploadImage} className="max-w-[240px] xs:max-w-full"/>
            {fileMessage && (
              <div className="text-center text-red-500 my-5">{fileMessage}</div>
            )}
          </div>
        </div>

        {/* name */}
        <div className="mb-5">
          <div className="text-sm mb-1 font-bold">Name</div>
          <input
            type="text"
            className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500"
            placeholder="Name"
            id="name"
            {...register("name", { required: true })}
          />
          <div className="my-3 text-center text-sm text-red-500">
            {errors.name?.message && errors.name.message.toString()}
          </div>
        </div>

        {/* introduce */}
        <div className="mb-5">
          <div className="text-sm mb-1 font-bold">Introduce</div>
          <textarea
            id="introduce"
            rows={5}
            placeholder="introduce"
            className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500"
            {...register("introduce", { required: true })}
          ></textarea>
        </div>

        {/* primary_currency */}
        <div className="mb-5">
          <div className="text-sm mb-1 font-bold">Primary Currency</div>
          <select
            id="primary_currency"
            className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500"
            {...register("primary_currency", { required: true })}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          <div className="my-3 text-center text-sm text-red-500">
            {errors.primary_currency?.message && errors.primary_currency.message.toString()}
          </div>
        </div>

        {/* change button */}
        <div className="mb-5">
          {loading ? (
            <Loading />
          ) : (
            <button
              type="submit"
              className="font-bold bg-buttonPrimary hover:brightness-95 w-full rounded-full p-2 text-white text-sm"
            >
              Change
            </button>
          )}
        </div>
      </form>

      {/* Message */}
      {message && (
        <div className="my-5 text-center text-red-500 mb-5">{message}</div>
      )}
    </div>
  );
};

export default Profile;
