const SectionTitle = ({ heading }) => {
  return (
    <div className="md:w-4/12 text-center mx-auto my-8">
      <h3 className="text-4xl uppercase border-y-4 font-bold text-red-600 py-4">
        ---{heading}---
      </h3>
    </div>
  )
}

export default SectionTitle
