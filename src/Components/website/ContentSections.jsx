import React from 'react'
import img from '../../assets/website/admin1.png'

const ContentSections = () => {
  return (
    <div className="relative isolate overflow-hidden px-6 py-10 sm:py-16 lg:overflow-visible lg:px-0">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 md:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base/7 font-semibold text-bg-color">Who We Are</p>
              <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight bg-gradient-to-br from-white to-gray-400 bg-clip-text leading-tight text-transparent sm:text-5xl">
                Empowering Innovation Through Collaboration
              </h1>
              <p className="md:mt-6 mt-4 text-base/5 font-light text-gray-700">
                We are a passionate team of creators, developers, and strategists committed to building powerful digital solutions. Our focus is on driving impact through meaningful design, seamless technology, and a shared mission to help our clients succeed.
              </p>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img
            alt="Team collaboration"
            src={img}
            className="md:w-[48rem] w-[28rem] md:mt-0 mt-10 max-w-none rounded-xl bg-gray-900 shadow-xl border sm:w-[57rem]"
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base/5 font-light text-gray-700 lg:max-w-lg">
              <p>
                At our core, we believe in creating lasting value. We work closely with our partners to understand their unique needs and craft solutions that go beyond expectations. Our culture is built on trust, transparency, and a relentless pursuit of excellence.
              </p>
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <span>
                    <strong className="font-medium text-gray-900">Collaborative Approach.</strong> We foster a culture of open communication and teamwork, ensuring every voice is heard and every idea explored.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <span>
                    <strong className="font-medium text-gray-900">Cutting-edge Technology.</strong> Our team leverages the latest technologies to deliver scalable, secure, and future-ready solutions.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <span>
                    <strong className="font-medium text-gray-900">Client-Centric Values.</strong> We measure our success by the success of our clients, always placing their needs at the heart of our work.
                  </span>
                </li>
              </ul>
              <p className="mt-8">
                We continuously invest in our team, our processes, and our technology to ensure we remain ahead of the curve. From initial discovery to final delivery, we are dedicated to excellence in everything we do.
              </p>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Join Us on Our Journey</h2>
              <p className="mt-6">
                Whether you're a potential partner, future team member, or curious visitor, we invite you to be a part of our journey. Let’s create something remarkable together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentSections
