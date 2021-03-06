/******************************************************************************
 * FILENAME: cache_structs.h
 * AUTHOR:   crf@cs.wisc.edu <Chris Feilbach>
 * DATE:     25 Oct 2013
 * PROVIDES: Provides structs to model cache memories.  The cache struct
 *           contains information about the cache being simulated.  The 
 *           address_info struct contains information about the address width
 *           of the machine, the and the number of offset,index, and tag bits
 *           used by the cache.  The cache_block structure contains information 
 *           about a cache block.  The cache_perf structure contains information 
 *           about hit rate for the cache being simulated.
 *****************************************************************************/
 
#ifndef CACHE_STRUCTS_H
#define CACHE_STRUCTS_H

#include <stdbool.h> // #defines for true, false, and bool typedef.

// Enumeration for memory reference types.  A memory reference can be
// caused by the CPU fetching an instruction, or the CPU reading or
// writing a data operand.
enum REFERENCE_TYPE {INSTRUCTION, DATA_READ, DATA_WRITE};



// A memory reference contains an address and a type.
struct memory_reference
{
	unsigned long address;
	enum REFERENCE_TYPE type;
};

// The address_info structure contains the width of the address,
// and the widths of the offset, index, and tag fields for the
// cache.
struct address_info
{
	unsigned int address_width;
	unsigned int offset_width;
	unsigned int index_width;
	unsigned int tag_width;
};

// The cache_perf structure contains the necessary attributes to determine
// hit rates for instruction fetches, data reads, and data writes.
struct cache_perf
{
	unsigned long int instruction_reference_count;
	unsigned long int instruction_miss_count;
	unsigned long int data_read_reference_count;
	unsigned long int data_read_miss_count;
	unsigned long int data_write_reference_count;
	unsigned long int data_write_miss_count;

	unsigned long int combined_hit;
	unsigned long int non_combined_hit;
	unsigned long int miss_count; // Incremented when neither a combined hit nor non combined hit occur.

	unsigned long int combined_count; // Number of TLB entries combined.
	unsigned long int evicted_count; // Number of combined TLB entries evicted.
};

// The cache struct contains information about the cache, a pointer to 
// the blocks in the cache, and a cache_perf structure to record cache
// performance.
struct cache
{
	unsigned long size;
	unsigned long associativity;
	unsigned long number_of_sets;
	unsigned long block_size;
	
	struct address_info addr_info;
	
	struct cache_block** blocks;
	struct cache_perf perf;
};


// The cache_block structure represents a cache block.  It contains status
// bits found in each cache block (valid and dirty), along with the tag
// for that block and data used to implement the LRU replacement policy.  
// Normally data would be found in this structure as well, but this simulator
// doesn't need data to determine the hit rate ... all you need is the
// addresses!
struct cache_block
{
	bool valid;
	bool dirty;
	bool combined;
	enum REFERENCE_TYPE type;
	unsigned int lru_value;
	unsigned int tag;
};


#endif
