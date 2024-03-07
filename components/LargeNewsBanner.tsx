import AvatarBadge from "./AvatarBadge";
import dateFormat from "dateformat";

const LargeNewsBanner = ({
  className,
  newsItem,
}: {
  className: string;
  newsItem: any;
}) => {
  return (
    <a
      className="flex space-between gap-10 items-center"
      href={newsItem.url}
      target="_blank"
      rel="noopener"
    >
      <div className="bg-red-500 basis-[100%] rounded-2xl overflow-hidden">
        <img
          className="object-cover basis-[100%]"
          src={newsItem.urlToImage}
          alt={newsItem.title}
        />
      </div>
      <div className="p-4 h-full flex flex-col gap-4 basis-[100%]">
        <div className="flex items-center gap-2">
          <AvatarBadge name={newsItem.sourceName || "Unknown source"} />
          <div className="flex flex-col">
            <span className="text-xs">
              <span className="font-semibold">
                {newsItem.sourceName || "Unknown source"}
              </span>
              <span className="px-1">&#x2022;</span>
              <span>{dateFormat(newsItem.publishedAt, "longDate")}</span>
            </span>
          </div>
        </div>
        <h2 className="font-bold text-3xl">{newsItem.title}</h2>
        <p className="grow text-xl">{newsItem.jokes[0].replace('"', "")}</p>
      </div>
    </a>
  );
};

export default LargeNewsBanner;
