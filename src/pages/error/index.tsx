import { AiFillBug } from 'react-icons/ai';

export function ErrorPage() {
  return (
    <div className='min-h-full bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8'>
      <div className='mx-auto max-w-max'>
        <main className='sm:flex'>
          <p className='text-4xl font-bold tracking-tight text-secondary-600 sm:text-5xl'>
            <AiFillBug />
          </p>
          <div className='sm:ml-6'>
            <div className='sm:border-l sm:border-gray-200 sm:pl-6'>
              <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
                Bug
              </h1>
              <p className='mt-1 text-base text-gray-500'>Please try again</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
