import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { getProducts } from "@/services/products/get-product";
import { useQuery } from "@tanstack/react-query";
import { FlatList, RefreshControl } from "react-native";

export default function ListScreen() {
  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  if (isLoading) {
    return <ThemedText>Loading...</ThemedText>;
  }

  if (error) {
    return <ThemedText>Error loading product</ThemedText>;
  }
  return (
    <>
      <ThemedText type="subtitle">Product Data (from API)</ThemedText>
      {data && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ThemedView>
              <ThemedText>{item.title}</ThemedText>
              <ThemedText>{item.description}</ThemedText>
            </ThemedView>
          )}
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={refetch} />
          }
          ListEmptyComponent={
            <ThemedView>
              <ThemedText>No data found</ThemedText>
            </ThemedView>
          }
        />
      )}
    </>
  );
}
