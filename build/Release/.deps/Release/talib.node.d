cmd_Release/talib.node := c++ -bundle -undefined dynamic_lookup -Wl,-search_paths_first -mmacosx-version-min=10.5 -arch x86_64 -L./Release  -o Release/talib.node Release/obj.target/talib/src/talib.o ../src/lib/lib/libta_libc_csr.a
