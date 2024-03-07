import AvatarBadge from "./AvatarBadge";
import dateFormat, { masks } from "dateformat";

// TODO: Define the type for the props
// type NewsItemProps = {
//     id: number;
//     title: string;
//     url: string;
//     joke: string;
// };

function wrapStr(str: string, len: number) {
  if (str.length <= len) {
    return str;
  } else {
    return str.substring(0, len - 3) + "...";
  }
}

const NewsItem = ({ className, newsItem }: { className: string }) => {
  return (
    <a
      className={`${className} w-full rounded-2xl overflow-hidden shadow-lg flex flex-col border border-slate-200 hover:translate-y-[-7px] transition-all`}
      href={newsItem.url}
      target="_blank"
      rel="noopener"
    >
      <div className="relative min-h-[250px] overflow-hidden">
        <img
          className="absolute w-full h-full object-cover"
          src={newsItem.urlToImage}
          alt={newsItem.title}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900"></div>
        <div className="absolute bottom-0 p-4">
          <h2 className="font-bold text-xl text-slate-100">{newsItem.title}</h2>
          <small className="text-slate-100 opacity-80">
            {wrapStr(newsItem.url, 50)}
          </small>
        </div>
      </div>

      <div className="p-4 h-full flex flex-col gap-4">
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
        <p className="grow">{newsItem.jokes[0].replace('"', "")}</p>
      </div>
    </a>
  );
};

export default NewsItem;
