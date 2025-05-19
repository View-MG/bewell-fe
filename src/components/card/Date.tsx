export default function LocalDateTime() {
  const date = new Date();
    const formatterDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Asia/Bangkok'
    });
    const formatterTime = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'Asia/Bangkok'
    });

  return (
    <div className="text-center p-4 flex flex-row gap-4">
      <div className="text-base font-medium bg-white p-2 rounded-2xl">{formatterDate.format(date)}</div>
      <div className="text-base font-medium bg-white p-2 rounded-2xl">{formatterTime.format(date)}</div>
    </div>
  );
}
